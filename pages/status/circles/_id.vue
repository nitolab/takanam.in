<template>
  <div>
    <v-dialog />
    <MainHeader/>
    <div class="wrp container">
      <div class="columns is-3-desktop">
        <div class="column is-3">
          <StatusNav/>
        </div>
        <div class="column dw">
          <h1>サークル編集</h1>

          <div class="_box">
            <circleForm :circle="circle"/>
          </div>

          <div class="_box delbox">
            <label class="label">サークル削除</label>
            <button class="button is-danger" @click.stop.prevent="delClick">削除する</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import circleForm from '~/components/circleForm'

export default {
  middleware: 'session',
  components: {
    circleForm,
  },
  data() {
    return {
      circle: null
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
            handler: this.delCircle
          },
          {
            title: 'Cancel',
            handler: ()=>this.$modal.hide('dialog')
          }
        ]
      })
    },
    async delCircle(ev) {
      try {
        this.loading = true;

        const r = await this.$axios.delete(
          'user/circles/' + this.$route.params.id,
          {
            headers: {
              'x-api-key': this.$store.state.session.token
            }
          }
        )
        this.loading = false;
        this.$router.push('./')
      } catch(e) {
        let msg = 'エラーが発生したかも'
        if(e.response.data.errors){
          msg = e.response.data.errors[0]
        }

        this.$toast.error(msg, {})
        this.$sentry.captureException(e)
      }
    }
  },
  async asyncData({params, app, store, error, $sentry}) {
    if(params.data){
      return {circle: params.data}
    }
    try {
      const r = await app.$axios.$get('user/circles/'+params.id, {
        headers: {'x-api-key': store.state.session.token}
      })
      return {
        circle: r.data
      }
    }catch(e){
      if(e.response){
        return error({statusCode: e.response.status, message: e.response.data.message})
      }

      $sentry.captureException(error)
      return error({statusCode: 500, message: 'なにかがおかしいです'})
    }
  }
}
</script>
