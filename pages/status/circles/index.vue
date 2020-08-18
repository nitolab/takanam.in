<template>
  <div id="userCircleIndex">
    <MainHeader/>
    <div class="wrp container">
      <div class="columns">
        <div class="column is-3">
          <StatusNav/>
        </div>

        <div class="column pr-6 pl-6">
          <div class="columns">
            <div class="column">
              <h1>Circles</h1>
            </div>
            <div class="column">
              <nuxt-link to="/status/circles/new" class="_add button is-primary" v-if="circles.length > 0">
                  <span class="svg"><faPlus/></span>サークルを追加
              </nuxt-link>
            </div>
          </div>
          <div v-if="circles.length == 0">
            本を登録するには、最低一つのサークル追加が必要です
          </div>
          <div id="circles">
            <div  v-for="circle in circles">
              <nuxt-link :to="{ name: 'status-circles-id', params: { id: circle.id } }" >
                <div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class=" is-4">{{circle.name}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import faPlus from '@fa/solid/plus.svg'

export default {
  middleware: 'session',
  components: {
    faPlus,
 },
  data() {
    return {
      circles: []
    }
  },
  async asyncData({store, app, error, params, $sentry}) {
    try{
      const r = await app.$axios.$get('user/circles', {headers: {'x-api-key': store.state.session.token}})
      return {
        circles: r.data
      }
    }catch(e){
      if(e.response){
        return error({statusCode: e.response.status, message: e.response.data.message})
      }

      $sentry.captureException(error)
      return error({statusCode: 500, message: 'なにかがおかしいです'})
    }
  }
}
</script>

<style lang="scss">
#userCircleIndex {
  ._add{
    text-decoration: none;
    svg{
      fill: #fff;
    }
  }
}
</style>
