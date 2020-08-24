<template>
  <div>
    <MainHeader/>

    <div class="wrp container">
      <main>
        <div>
          <h1>{{circle.name}}</h1>
          <div class="_description">
            <p v-html="circle.description_html" />
          </div>
          <div>
            <ul>
              <li v-if="circle.twitter_id"><a :href="'https://twitter.com/'+circle.twitter_id" target="_blank">twitter</a></li>
              <li v-if="circle.pixiv"><a :href="circle.pixiv" target="_blank">pixiv</a></li>
            </ul>
          </div>
        </div>
        <div>
          <h2>このサークルの作品</h2>
          <div class="columns">
            <div class="column is-4" v-for="item in items">
              <nuxt-link :to="'/books/'+item.id">
                {{item.title}}
                <img :src="item.main_image_thumb" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </main>
    </div>

    <Footer/>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  head() {
    return {
      title: this.circle.name + ' | Takanam.in',
      meta: [
        { hid: 'description', name: 'description', content: this.circle.description_short },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'author', name: 'author', content: this.circle.name },
        { hid: 'og:title', name: 'og:title', content: this.circle.name + ' | Takanam.in' },
        { hid: 'og:description', name: 'og:description', content: this.circle.description_short },
      ]
    }
  },
  async asyncData ({params,app,error,$sentry}) {
    const id = params.id||''
    return Promise.all([
      app.$axios.$get('circles/'+id),
    ])
      .then(([circle])=>{
        return {
          circle: circle.data.circle,
          items: circle.data.items
        }
      })
      .catch(e=>{
        if(e.response){
          return error({statusCode: e.response.status, message: e.response.status.statusText})
        }
        $sentry.captureException(error)
        return error({statusCode: 500, message: 'なにかがおかしいです'})
      })
  }
}
</script>
