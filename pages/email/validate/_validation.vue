<template>
  <div>
    <div v-if="status">
      OK!!!!
    </div>
    <div v-else>
      NO!!!
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {}
  },
  async asyncData({app,error,params,$sentry}) {
    return app.$axios.get('user/email/validate?verifier='+params.validation)
      .then((r)=>{
        // if(this.$store.state.session.token){
        //   await this.$store.dispatch('session/load', this.$store.state.session.token)
        // }
        return {status: true}
      })
      .catch((err)=>{
        if(err.response){
          return {status: false}
        }
        $sentry.captureException(error)
        return error({statusCode: 500, message: 'なにかがおかしいです'})
      })
  }
}
</script>

<style lang="scss">

</style>
