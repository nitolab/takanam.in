<template>
  <div id="circles">
    <MainHeader/>
    <div class="wrp container">

      <section class="columns">
        <div class="column" v-for="circle in circles">
          <nuxt-link :to="{name: 'circles-id', params:{id: circle.id, data: circle}}">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{circle.name}}</p>
                  </div>
                </div>

                <div class="content">
                  <br>
                  <time datetime="2016-1-1"></time>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </section>

    </div>
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
      circles: []
    }
  },
  async asyncData({params,app,error,$sentry}){
    return axios.get('circles/')
      .then((res) => {
        return { circles: res.data.data }
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

<style>
</style>
