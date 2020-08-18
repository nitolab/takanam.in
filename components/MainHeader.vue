<template>
  <header id="mainHead">
    <div class="container">
      <nav class="takanami_nav">
        <div class="_title">
          <nuxt-link to="/" class="navbar-item">
            <h1>Takanami</h1>
          </nuxt-link>
        </div>
<!--         <nav class="_nav">
          <nuxt-link to="/circles" class="navbar-item">Circles</nuxt-link>
          <nuxt-link to="/books" class="navbar-item">Books</nuxt-link>
          <nuxt-link to="/status" class="navbar-item">Status</nuxt-link>
        </nav>
 -->        <div class="_right _p">
          <UserMenu v-if="logged_in" />
          <div v-else><nuxt-link to="/login">login</nuxt-link></div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
$green: #39c337;
#mainHead {
  width: 100%;
  border-top: solid #333 2px;
  border-bottom: solid 1px #333;

  a {
    text-decoration: none;
    &:hover {
      background: none;
    }
    &:focus {
      background:none;
      color: #fff;
    }
  }
  &, & .navbar{
    background-color: $green;
  }

  .takanami_nav{
    min-height: 50px;
    position: relative;
    display: flex;
    & > ._p {
      // padding-top: 2px;
      padding-right: .5em;
    }
    & > ._title {
      width: 5em;
      h1 {
        font-weight: 300;
        font-size: 2em;
        color: #fff;
      }
    }

    & > ._right {
      position: absolute;
      right: 0;
    }
  }
  ._nav {
    .navbar-item {
      border:solid red 1px;
    }
  }
}
</style>

<script>
import UserMenu from '~/components/parts/UserMenu'
export default {
  components: {
    UserMenu
  },
  computed: {
    logged_in() {
      return this.$store.state.session.logged_in
    }
  }
}
</script>


