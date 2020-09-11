<template>
  <div id="indexpage">
    <MainHeader/>

    <div class="wrp">
      <section class="hero is-medium is-primary is-bold">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              高波
            </h1>
          </div>
        </div>
      </section>

      <div class="container">
        <article>
          <p>絶賛テスト中</p>
        </article>
        <div class="columns">
          <button @click="rrr">famas</button>
        </div>
        <div class="cn">
          <div v-for="book in books" class="c">
            <nuxt-link :to="'books/'+book.id">
              <ItemCard :item="book" />
            </nuxt-link>
          </div>
        </div>
        <div>
          <Informations :posts="posts" />
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style lang="scss">
#indexpage {
}
</style>

<script>
import MainHeader from '~/components/MainHeader'
import Footer from '~/components/Footer'
import Informations from '~/components/Informations'
import ItemCard from '~/components/parts/ItemCard'

export default {
  components: {
    MainHeader,
    Informations,
    ItemCard,
    Footer
  },
  head () {
    return {
      title: 'takanami',
      meta: [
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        // { hid: 'twitter:creator', name: 'twitter:creator', content: '@' },
        { hid: 'og:url', name: 'og:url', content: process.env.siteUrl+this.$route.fullPath },
      ]
    }
  },
  data() {
    return {}
  },
  methods: {
    rrr(ev){
      console.log(ev)
      this.$axios.get('some-url')
        .then((responce)=>{/*some function*/})
        .catch((e)=>{
          if(e.response && e.response.status == 503){
            this.$nuxt.error({statusCode: 500})
          }
        })
    }
  },
  async asyncData(app) {
    return Promise.all([
      app.$axios.get('https://doc.nitolab.com/wp-json/wp/v2/takanami'),
      app.$axios.$get('/items')
    ]).then(([inform,books])=>{
      return {
        posts: inform.data,
        books: books.data
      }
    }).catch((e)=>{
      console.log(e)
      return {
        posts: [],
        books: []
      }
    })
  }
}
</script>

