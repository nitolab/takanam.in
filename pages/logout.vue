<template>
  <div></div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  async asyncData({app, redirect, }) {
    if(!process.server){
      Cookies.remove('_session')
    }
    await app.store.dispatch('session/logout')
    redirect(302, '/login')
  }
}
</script>
