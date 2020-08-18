<template>
  <div id="LoginForm">
    <div class="_error">
      <span  v-if="error_message">{{error_message}}</span>
    </div>

    <form v-on:submit.prevent="sendAction" >

      <div class="field">
        <input class="input" type="email" placeholder="Your Email" v-model="email" required>
      </div>

      <div class="field">
        <div class="control">
          <input class="input" type="password" placeholder="Your Password" v-model="password" required>
        </div>
      </div>

      <button class="button is-fullwidth" :class="{'is-loading': loading}"><strong>Login</strong></button>
    </form>

  </div>
</template>

<script>
import Cookies from 'js-cookie'

import user from '~/components/icons/user'
import email from '~/components/icons/email'

export default {
  data() {
    components: {
      user,
      email
    }
    return {
      email: '',
      password: '',
      loading: false,
      error_message: ''
    }
  },
  methods: {
    async sendAction(ev) {
      try {
        this.loading=true

        const r = await this.$axios.post('auth/sign_in', {
          email: this.email,
          password: this.password
        })
        const token = r.headers['x-api-key'] || r.headers['X-api-key']

        if(!process.server){
          Cookies.set('_session', r.headers['x-api-key'], { expires: 7 })
        }

        await this.$store.dispatch('session/login', {token:token, user:r.data.data, expires: 7})

        const next = this.$route.query.next || '/'
        this.$router.push(next)

      }catch(e){
        this.error_message = 'Login Fail'
      }
      this.loading=false
    }
  }
}
</script>

<style lang="scss">
$green: #39c337;
#LoginForm {
  .button {
    margin-top: .8em;
    border-color: $green;
    color: $green;
    &:hover {
      border-color: $green;
      background-color: $green;
      color: #fff;
    }
  }
  ._error {
    margin-top: -.8em;
    height: 1.5em;
    text-align:center;
    color: red;
  }
}
</style>
