<template>
  <form v-on:submit.prevent="sendAction" >
      <label class="label">Change Password</label>

      <div class="notification is-success" v-if="done">
        <button class="delete" @click="done=false"></button>
        変えたかも！
      </div>

      <div class="notification is-danger" v-if="message">
        <button class="delete" @click="message=''"></button>
        {{message}}
      </div>

      <div class="field">
        <input
          class="input"
          type="password"
          placeholder="password"
          v-model="password"
          :class="{'is-danger': !good, disabled: !enable}"
          :disabled="!enable"
          required
         />
        <p class="help is-danger" v-show="!good">min length is 6 words</p>
      </div>
      <div class="field">
        <input
          class="input"
          type="password"
          placeholder="re-type password"
          v-model="password_confirmation"
          :class="{'is-danger': !ok, disabled: !enable}"
          :disabled="!enable"
          required
        />
        <p class="help is-danger" v-show="!ok">Invalid password</p>
      </div>
      <button
        class="button"
        :class="{'is-loading': loading, 'disabled': !send_ok}"
        :disabled="!send_ok"
      >change</button>
  </form>
</template>

<script>
export default {
  params: [
  ],
  data() {
    return {
      password: '',
      password_confirmation: '',
      loading: false,
      done: false,
      message: '',
      enable: true
    }
  },
  computed: {
    good(){
      return this.password.length == 0 || this.password.length > 6
    },
    ok(){
      return this.password_confirmation.length == 0 || this.password == this.password_confirmation
    },
    send_ok(){
      return this.good && this.ok && this.password.length + this.password_confirmation.length > 12
    }
  },
  methods: {
    async sendAction() {
      if(!this.send_ok)return
      this.message = ''
      this.done = false

      try {
        this.loading = true
        const r = await this.$axios.put('auth/password', {
          password: this.password,
          password_confirmation: this.password_confirmation
          },
          {
            headers: {
              'x-api-key': this.$store.state.session.token
            }
          }
        )
        this.password = ''
        this.password_confirmation = ''
        this.done = true
      }catch(e){
        if(e.response&&Math.floor(e.response.status/100)==4){
          this.message = e.response.data.errors[0]
        }else{
          this.message = '何かのエラーかも'
          this.$sentry.captureException(e)
        }
      }
      this.loading = false
    }
  }
}
</script>
