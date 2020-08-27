<template>
  <div id="dashboard">
    <MainHeader/>

    <div class="wrp container">
      <div class="columns is-3-desktop">
        <div class="column is-3">
          <StatusNav/>
        </div>

        <div class="column is-9">
          <h1>Dashboard</h1>
          <div class="columns">
            <div class="column is-4">
              <img :src="$store.state.session.user.icon_str"/>
            </div>
            <div class="column">
              <span>{{$store.state.session.user.name}}</span>

            </div>
          </div>

          <section class="information" v-if="info">
            <div v-html="info.content.rendered" />
          </section>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import StatusNav from '~/components/StatusNav'
import UserMenu from '~/components/parts/UserMenu'

export default {
  middleware: 'session',
  components: {
    StatusNav,
    UserMenu,
  },
  data() {
    return {}
  },
  async asyncData({app}) {
    return app.$axios.get('https://doc.nitolab.com/wp-json/wp/v2/takanami_info/')
      .then((r)=>{
        return {
          info: r.data.length > 0 ? r.data[0] : null
        }
      })
      .catch((e)=>{
        return {
          info: null
        }
      })
  }
}
</script>

<style lang="scss">
#dashboard {
  .information {
    max-width: 100%;
    padding: 2em;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
