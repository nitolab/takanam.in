<template>
  <div id="registerForm">
    <div class="notification is-danger" v-if="error_message">
      <button class="delete" @click="error_message = ''"></button>
      {{error_message}}
    </div>

    <form v-on:submit.prevent="sendAction" >
      <div class="field">
        <label class="label">Name</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Name" v-model="name" required>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email" v-model="email" required>
          <span class="icon is-small is-left">
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Password" v-model="password" required>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Re-Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Confilm Password" v-model="password_confilmation" required>
          <span class="icon is-small is-left">
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>

      <button class="button is-fullwidth" :class="{'is-loading': loading}">Regist</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confilmation: '',
      error_message: '',
      loading: false
    }
  },
  methods: {
    async sendAction(ev) {
      try {
        this.loading = true
        let r = await this.$axios.post('/auth/',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confilmation: this.password_confilmation,
          }
        )
        console.log(r)
        if(r.status != 200){
          throw 'error!'
        }
        // this.$store.commit('todos/add', r.data.)
      }catch(e){
        console.log(e)
        console.log(e.response)
        if(e.response){
          this.error_message = e.response.data.errors.full_messages[0]
        }
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
$green: #39c337;
#registerForm {
  padding: 1em;

  .button, label {
    color: $green;
  }

  input {
    border-color: $green;
  }
  .button {
    margin-top: 2.6em;
    border-color: $green;
  }
}
</style>
