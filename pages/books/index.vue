<template>
  <div id="books">
    <MainHeader/>

    <div class="wrp container">
      <section class="columns">
        <div class="column is-one-third" v-for="book in books">
          <nuxt-link :to="{name: 'books-id', params:{id: book.id, data: book}}">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="book.main_image_str" alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{{book.title}}</p>
                    <!-- <nuxt-link :to="{name: 'circles-id', params:{id: book.circle_id}}"> -->
                      <p class="subtitle is-6" v-if="book.circle">{{book.circle.name}}</p>
                    <!-- </nuxt-link> -->
                  </div>
                </div>

                <div class="content">
                  {{book.description}}
                  <br>
                  <time datetime="2016-1-1"></time>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </section>
    </div>

    <Footer/>
  </div>
</template>

<script>
export default {
  components: {
  },
  head () {
    return {
      title: 'Books | takanami',
      meta: [
        { hid: 'description', name: 'description', content: 'books' }
      ]
    }
  },
  async asyncData ({params,app,error,$sentry}) {
    const id = params.id||''
    return app.$axios.get('items/')
      .then((res) => {
        return { books: res.data.data }
      })
      .catch((e)=> {
        if(e.response){
          return error({statusCode: e.response.status, message: e.response.status.statusText})
        }
        $sentry.captureException(error)
        return error({statusCode: 500, message: 'なにかがおかしいです'})
      })
  }
}
</script>

<style lang="scss">
#books {
  .ff {
    // display: flex;
  }
  .famas {
    max-width: 300px;
  }
  .columns{
    display:flex;
    flex-wrap: wrap;
    ._item {
      min-width:400px;
    }
  }
}
</style>
