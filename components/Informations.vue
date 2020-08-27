<template>
  <div>
    <h2>Informations</h2>
    <ul>
      <li v-for="post in posts">
        {{post.date}}
        <nuxt-link
          :to="{name: 'info-id', params:{id: post.id, post: post}}"
        >{{post.title.rendered}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    posts: {
      default: []
    }
  },
  data() {
    return {
    }
  }
}
</script>
