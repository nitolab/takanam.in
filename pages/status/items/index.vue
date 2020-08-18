<template>
  <div id="userItemIndex">
    <MainHeader/>
    <div class="wrp container">
      <div class="columns is-3-desktop">
        <div class="column is-3">
          <StatusNav/>
        </div>

        <div class="column pr-6 pl-6">

          <div class="columns">
            <div class="column">
              <h1>Items</h1>
            </div>
            <div class="column">
              <nuxt-link to="/status/items/new" class="button is-primary _add">
                  <span class="svg"><faPlus/></span>add Item
              </nuxt-link>
            </div>
          </div>

          <ul>
            <li v-for="item in items">
              <nuxt-link :to="{ name: 'status-items-id', params: { id: item.id, data: item } }" >
                <div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class=" is-4">{{item.title}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style lang="scss">
#userItemIndex {
  ._add{
    text-decoration: none;
    svg{
      fill: #fff;
    }
  }
}
</style>

<script>
import faPlus from '@fa/solid/plus.svg'

export default {
  middleware: 'session',
  components: {
    faPlus,
  },
  data() {
    return {
      items: []
    }
  },
  async asyncData({store, app, params, error, $sentry}) {
    try{
      const r = await app.$axios.$get('user/items', {
        headers: {'x-api-key': store.state.session.token}
      })
      return {
        items: r.data
      }
    }catch(e){
      if(e.response){
        return error({statusCode: e.response.status, message: e.response.data.errors[0]})
      }

      $sentry.captureException(error)
      return error({statusCode: 500, message: 'なにかがおかしいです'})
    }
  }
}
</script>
