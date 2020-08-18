<template>
  <div id="LoginWith">
    <button
      id="login_with_twitter"
      class="button"
      :disabled="!enable"
      :class="{'is-loading': loading, 'disabled': !enable }"
      @click="login"
    >
      <twitter />{{message}}</button>
  </div>
</template>

<script>
import twitter from '~/components/icons/twitter'

export default {
  components: {
    twitter
  },
  props: {
    register: {
      type: Boolean,
      default: false
    },
    enable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed:{
    message(){
      if(this.register){
        return 'Register with Twitter'
      }
      return 'Login with Twitter'
    },
    mode(){
      if(this.register){
        return 'register'
      }
      return 'login'
    }
  },
  methods: {
    async login(ev) {
      this.loading = true
      try{
        const r = await this.$axios.$get('auth/twitter', {
          params: {
            mode: this.mode
          }
        })
        location.href = r.data
      }catch(e){
        let msg = 'エラーが発生したかも'
        console.log(e.response)
        if(e.response.data.errors){
          msg = e.response.data.errors[0]
        }
        this.$toast.error(msg, {})
        this.$sentry.captureException(e)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
#login_with_twitter {
  width: 100%;
  color: #fff;
  background-color: #1da1f2;
  &.is-loading svg {
    display: none;
  }
  svg {
    width: .6em;
    margin-right:.2em;
    font-size: 2.5em;
    fill: #fff;
  }
}
</style>
