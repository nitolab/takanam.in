<template>
  <div>
    <MainHeader/>

    <div class="wrp container">

    </div>

    {{circle}}
    <Footer/>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

import MainHeader from '~/components/MainHeader'
import Footer from '~/components/Footer'
export default {
  components: {
    MainHeader,
    Footer
  },
  data() {
    return {
      id: this.$route.params.id,
      circle: [],
    }
  },
  head () {
    return {
      title: 'Books | ',
      meta: [
        { hid: 'description', name: 'description', content: 'books' }
      ]
    }
  },
  async asyncData ({params,app,error,$sentry}) {
    if(params.data){
      return{ circle: params.data }
    }
    const id = params.id||''
    return app.$axios.get('circles/'+id)
      .then((res) => {
        return { circle: res.data.data }
      })
      .catch((e)=> {
        if(e.response){
          return error({statusCode: e.response.status, message: e.response.status.statusText})
        }
        $sentry.captureException(error)
        return error({statusCode: 500, message: 'なにかがおかしいです'})
      })
  }
}
</script>
