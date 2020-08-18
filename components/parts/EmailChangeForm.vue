<template>
  <form v-on:submit.prevent="sendAction" >
    <label class="label" v-if="enable">Emailアドレス変更</label>
    <label class="label" v-else>Email登録</label>

    <p v-if="!enable"> サークルとして使用する場合は、Emailアドレスを設定してください。 </p>
    <br/>

    <div class="notification is-success" v-if="done">
      <button class="delete" @click="done=false"></button>
      変えたかも！
    </div>

    <div class="notification is-danger" v-if="message">
      <button class="delete" @click="message=''"></button>
      {{message}}
    </div>

    <div class="field">
      <div class="columns">
        <div class="column is-9">
          <input class="input" type="email" v-model="email_address" :placeholder="email" required />
        </div>
        <div class="column is-3">
          <button
            class="button is-fullwidth is-primary"
            :class="{'is-loading': loading, 'disabled': !send_ok}"
            :disabled="!send_ok"
          >change</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: [
    'email',
    'enable'
  ],
  data() {
    return {
      email_address: '',
      loading: false,
      done: false,
      message: ''
    }
  },
  computed: {
    send_ok(){
      return this.email_address != this.email && this.email_address.length > 5
    }
  },
  methods: {
    async sendAction() {
      this.message = ''
      this.done = false

      try {
        this.loading = true
        const r = await this.$axios.put('auth', {
            email: this.email_address
          },
          {
            headers: {
              'x-api-key': this.$store.state.session.token
            }
          }
        )
        await this.$store.dispatch('session/load', r.headers['x-api-key'])
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
