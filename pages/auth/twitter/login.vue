<template>
  <div id="verifing">
    <nuxt-link to="/" class="_h"><h1>Takanami</h1></nuxt-link>
    <div id="loader">
      <div v-if="loading" class="_b">
        <Loading class="_c"/>
      </div>
      <div v-if="error" class="_b">
        <div class="_w">
          <warn/>
        </div>
      </div>
      <p>{{message}}</p>
      <nuxt-link to="/login">retry</nuxt-link>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

import Loading from '~/components/parts/Loading'
import warn from '@fa/solid/exclamation-triangle.svg'

export default {
  components: {
    Loading,
    warn
  },
  head: {
    bodyAttrs: {
      class: 'fill takanami'
    }
  },
  data () {
    return {
      loading: true,
      error: false,
      message: '確認してるかも...',
    }
  },
  methods: {
    async verify(ot,ov){
      try{
        const r = await this.$axios.post('auth/twitter/login', {
          oauth_token: ot,
          oauth_verifier: ov
        })
        this.loading = false
        this.message = '完了したかも!'

        if(!process.server){
          Cookies.set('_session', r.headers['x-api-key'], { expires: 7 })
        }

        this.$store.commit('session/set', r.headers['x-api-key'])
        this.$store.commit('session/setUser', r.data.data)

        const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))
        await sleep(500)

        this.$router.push('/status/')

      }catch(e){
        this.loading = false
        this.error = true
        this.message = 'error'

        if(e.response){
          if(Math.floor(e.response.status / 100) == 4){ this.message = e.response.data.errors[0]; return}
          if(Math.floor(e.response.status / 100) == 5){ this.message = 'サーバー処理に失敗したかもです' }
        }
        this.$sentry.captureException(e)
      }
    }
  },
  mounted () {
    const oauth_token = this.$route.query.oauth_token
    const oauth_verifier = this.$route.query.oauth_verifier

    delete this.$route.query.oauth_token
    delete this.$route.query.oauth_verifier

    if(oauth_token && oauth_verifier) {
      this.verify(oauth_token, oauth_verifier);
    }
    else {
      this.error = true
      this.loading = false
      this.message = 'なにかがおかしいかもです'
    }
  }
}
</script>

<style lang="scss">
#verifing {
  width: 100%;
  height: 90vh;
  display:flex;
  align-content: center;
  #loader {
    width: 15em;
    height: 5em;
    margin: auto;
    color: #fff;
  }
  ._c {
    margin: auto;
    padding-top: 2em;
    box-sizing: border-box;
  }
  text-align:center;
  p {
    padding-top: 1em;
  }
  a:hover{
    color: #fff;
  }
  ._w svg{
    fill: #deffd1;
    width: 4em;
  }
  ._b {
    height: 4em;
  }
  ._h {
    position: absolute;
    display: block;
    width:8em;
    left: calc(50% - 4em);
    top: 2em;
    font-size: 2em;
    text-decoration: none;
    font-weight:300;
    color: #99ff74;
  }
}
</style>
