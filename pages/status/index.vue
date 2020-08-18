<template>
  <div>
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

        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import axios from 'axios'
import MainHeader from '~/components/MainHeader'
import Footer from '~/components/Footer'
import StatusNav from '~/components/StatusNav'
import UserMenu from '~/components/parts/UserMenu'

export default {
  middleware: 'session',
  components: {
    MainHeader,
    Footer,
    StatusNav,
    UserMenu,
  }
}
</script>

<style lang="scss" scoped>
.bt {
  width:3em;
  height:3em;
}
.loading {
  width: 1.1em;
  height: 1.1em;
  border: 2px solid rgba(0, 181, 173, 0.6);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spinner .5s linear infinite;
}

@keyframes spinner {
  100% {
    transform: rotate(360deg);
  }
}
</style>
