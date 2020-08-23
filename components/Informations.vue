<template>
  <div>
    <ul>
      <li v-for="post in posts">
        <nuxt-link :to="'info/'+post.id" >{{post.title.rendered}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:[
    'posts'
  ],
  data() {
    return {
      famas: "nitori"
    }
  }
}
</script>
