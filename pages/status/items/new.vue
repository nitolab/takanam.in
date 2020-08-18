<template>
  <div>
    <MainHeader/>
    <div class="wrp container">
      <div class="columns is-3-desktop">
        <div class="column is-3">
          <StatusNav/>
        </div>

        <div class=" column is-9 pr-6 pl-6">
          <h2>アイテム追加</h2>
          <itemForm v-if="!success" :circles="circles" @success="done" />

          <div class="_success" v-if="success">
            <div class="__icon"><check/></div>
            <p>作成完了しました。</p>
            <p><nuxt-link :to="{ name: 'status-items-id', params: { id: id } }" >詳細ページ</nuxt-link>に移動して表示を有効にすれば公開されます</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import itemForm from '~/components/itemForm'
import check from '@fa/solid/check.svg'

export default {
  middleware: 'session',
  components: {
    itemForm,
    check
  },
  data() {
    return {
      success: false,
      id: null
    }
  },
  methods: {
    done(id){
      if(id){
        this.success = true
        this.id = id
      }else{
        this.success = false
        this.id = null
      }
    }
  },
  created() {
  },
  async asyncData({store, app, error, params, $sentry}) {
    try{
      const r = await app.$axios.$get('user/circles', {headers: {'x-api-key': store.state.session.token}})
      return {
        circles: r.data
      }
    }catch(e){
      if(e.response){
        return error({statusCode: e.response.status, message: e.response.data.message})
      }

      $sentry.captureException(e)
      return error({statusCode: 500, message: 'なにかがおかしいです'})
    }
  }
}
</script>

<style lang="scss">

._success {
  padding: 5em 1em;
  background-color: #39c337;
  color: #fff;
  text-align: center;

  svg {
    fill: #fff;
    width: 4em;
  }
  .__icon {
    padding-bottom: 2em;
  }
}
</style>

