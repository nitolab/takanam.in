<template>
  <div>
    <MainHeader/>

    <div class="wrp container">
      <article>
        <h1>{{post.title.rendered}}</h1>
        <div>{{post.date}}</div>
        <div v-html="post.content.rendered" />
      </article>
    </div>

    <Footer/>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  head () {
    return {
      title: this.post.title.rendered + ' | Takanam.in',
      meta: []
    }
  },
  async asyncData({app,params,error,$sentry}) {
    return app.$axios.get('https://api.sateraito.nagoya/wp-json/wp/v2/posts/'+params.id)
      .then((r) => {
        return {
          post: r.data
        }
      })
      .catch((e)=>{
        if(e.response){
          return error({statusCode: e.response.status, message: e.response.status.statusText})
        }
        $sentry.captureException(error)
        return error({statusCode: 500, message: 'なにかがおかしいです'})
      })
  }
}
</script>
