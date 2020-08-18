<template>
  <div>
    <v-dialog />
    <MainHeader/>
    <div class="wrp container">
      <div class="columns is-3-desktop">
        <div class="column is-3">
          <StatusNav/>
        </div>

        <div class=" column dw">
          <h1>Items Edit</h1>

          <div class="_box">
            <h3>表示確認</h3>
            <nuxt-link :to="{ name: 'books-id', params: { id: item.id } }" >確認する</nuxt-link>
          </div>

          <div class="_box">
            <h3>有効化</h3>
            <EnableButton :state="item.enable" name="enable" :item_id="item.id" />
          </div>

          <div class="_box">
            <h3>修正</h3>
            <itemForm :item="item" :circles="circles" />
          </div>

          <div class="_box delbox">
            <label class="label">削除</label>
            <button class="button is-danger" @click.stop.prevent="delClick">delete</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import EnableButton from '~/components/parts/EnableButton'
import itemForm from '~/components/itemForm'

export default {
  middleware: 'session',
  components: {
    itemForm,
    EnableButton,
  },
  data() {
    return {
      item: null,
    }
  },
  methods: {
    delClick(){
      this.$modal.show('dialog', {
        title: '確認',
        text: '本当に削除するかもです？',
        buttons: [
          {
            title: 'OK',
            handler: this.delItem
          },
          {
            title: 'Cancel',
            handler: ()=>this.$modal.hide('dialog')
          }
        ]
      })
    },
    async delItem() {
      try {
        this.loading = true;
        const r = await this.$axios.$delete(
          'user/items/' + this.$route.params.id,
          {
            headers: {
              'x-api-key': this.$store.state.session.token
            }
          }
        )
        this.loading = false;
        this.$router.push('./')
      } catch(e) {
        this.$sentry.captureException(e)
      }
    }
  },
  async asyncData({store, app, params, error, $sentry}) {
    // if(params.data){
    //   return {
    //     item: params.data
    //   }
    // }

    return Promise.all([
      app.$axios.$get('user/items/'+params.id, {headers: {'x-api-key': store.state.session.token} }),
      app.$axios.$get('user/circles', {headers: {'x-api-key': store.state.session.token}})
    ])
      .then(([item,circles])=>{
        return {
          item: item.data,
          circles: circles.data
        }
      })
      .catch(e=>{
        if(e.response){
          return error({statusCode: e.response.status, message: e.response.data.message})
        }
        $sentry.captureException(error)
        return error({statusCode: 500, message: 'なにかがおかしいです'})
      })

  }
}
</script>
