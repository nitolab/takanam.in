<template>
  <div id="PersonalSetting">
    <v-dialog />
    <MainHeader/>
    <div class="wrp container">

      <div class="columns">
        <div class="column is-3">
            <StatusNav/>
        </div>

        <div class="column is-9">
          <div id="PersonalWrp">
            <div v-if="ok">
              <div class="_box">
                <form>
                  <label class="label">Twitter連携</label>
                  <div class="field">
                    <div v-if="user.twitter_authed">連携済み</div>
                    <LoginWithTwitterButton v-else :disabled="user.email_authed" />
                  </div>
                </form>
              </div>

              <div class="_box">
                <EmailChangeForm
                  :enable="user.email_authed"
                  :email="user.email"
                />
              </div>

              <div class="_box __rem">
                <button class="button is-danger" @click="delClick">remove Account</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import LoginWithTwitterButton from '~/components/parts/LoginWithTwitterButton'
import PasswordChangeForm from '~/components/parts/PasswordChangeForm'
import EmailChangeForm from '~/components/parts/EmailChangeForm'
import MainHeader from '~/components/MainHeader'
import Footer from '~/components/Footer'

export default {
  middleware: 'session',
  components: {
    MainHeader,
    EmailChangeForm,
    Footer,
    PasswordChangeForm,
    LoginWithTwitterButton
  },
  data() {
    return {
      ok: false,
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
            handler: this.delUser
          },
          {
            title: 'Cancel',
            handler: ()=>this.$modal.hide('dialog')
          }
        ]
      })
    },
    async delUser(){
      console.log('delete')
      try {
        const r = await this.$axios.$delete('auth', {headers: {'x-api-key': this.$store.state.session.token}})
        this.$router.push('/')
      }catch(e){
        this.$sentry.captureException(e)
        console.log(e)
      }
    }
  },
  async asyncData({param, app, store, error, $sentry}) {
    try {
      const r = await app.$axios.$get('user', {headers: {'x-api-key': store.state.session.token}})
      return {
        ok: true,
        user: r.data.user
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
#PersonalSetting {

}
#PersonalWrp {
  padding: 2em;
  input.input {
    border-color: #39c337;
  }
  ._box {
    padding: 1em 0;
  }
  .__rem{
    text-align: right;
  }
}
</style>
