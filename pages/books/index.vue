<template>
  <div id="books">
    <MainHeader/>

    <div class="wrp container">
      <section class="columns">
        <div class="column is-4 smpl" v-for="book in books">
          <nuxt-link :to="{name: 'books-id', params:{id: book.id}}">
            <ItemCard :item="book"/>
          </nuxt-link>
        </div>
      </section>
    </div>

    <Footer/>
  </div>
</template>

<script>
import ItemCard from '~/components/parts/ItemCard'
export default {
  components: [
    ItemCard
  ],
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
  .smpl a{
    text-decoration: none;
  }
}
</style>
