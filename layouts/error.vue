<template>
 <div id="err">
    <div id="zw">
      <h1 v-if="error.statusCode == 404">404</h1>
      <p v-if="error.statusCode == 404">ページが見つからないかも…</p>
      <h1 v-if="error.statusCode != 404">{{ error.statusCode }}</h1>
      <p v-if="error.statusCode != 404">{{error.message}}</p>
      -<nuxt-link to="/">go Home</nuxt-link>-
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head: {
    bodyAttrs: {
      class: 'fill takanami'
    }
  }
}
</script>

<style lang="scss">
$green: #39c337;

#err {
  text-align: center;
  padding-top: 5em;
  color: #333;
  h1{
    font-size: 6em;
    text-shadow: 0.02em 0.02em 0.02em rgba(255,255,255,.5);
  }
  a {
    color: #fff;
  }
  p {
    font-size: 1.2em;
    padding-bottom: 2em;
  }
}
</style>
