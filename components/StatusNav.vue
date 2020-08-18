<template>
  <nav>
    <aside class="menu">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li><nuxt-link to="/status" class="navbar-item">Dashbord</nuxt-link></li>
        <li><nuxt-link to="/status/edit" class="navbar-item">Personal Setting</nuxt-link></li>
        <li><nuxt-link to="/status/circles" class="navbar-item" :class="" v-if="$store.state.session.user.enable_circle" >Circles</nuxt-link></li>
        <li><nuxt-link to="/status/items" class="navbar-item" v-if="$store.state.session.user.enable_circle" >Items</nuxt-link></li>
      </ul>
    </aside>
  </nav>
</template>

<script>
</script>

<style lang="scss">
</style>
