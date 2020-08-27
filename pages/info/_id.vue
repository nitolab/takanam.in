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
  head () {
    let meta = [
        // { hid: 'description', name: 'description', content: this.book.description_short },
        // { hid: 'author', name: 'author', content: this.book.circle.name },
      ]
    return {
      title: this.post.title.rendered + ' | Takanam.in Information',
      meta: meta
    }
  },
  async asyncData({app,params,error,$sentry}) {
    if(params.post){
      return {post: params.post}
    }
    return app.$axios.get('https://doc.nitolab.com/wp-json/wp/v2/takanami/'+params.id)
      .then((r) => {
        return {
          post: r.data
        }
      })
      .catch((e)=>{
        console.log(e)
        if(e.response){
          return error({statusCode: e.response.status, message: e.response.status.statusText})
        }
        $sentry.captureException(error)
        return error({statusCode: 500, message: 'なにかがおかしいです'})
      })
  }
}
</script>
