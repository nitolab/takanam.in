<template>
  <div id="bookShow">
    <MainHeader/>

    <div class="wrp container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><nuxt-link to="/" >Takanam.in</nuxt-link></li>
          <li><nuxt-link :to="{name: 'circles-id', params: {id: book.circle.id}}" >{{book.circle.name}}</nuxt-link></li>
          <!-- <li>{{book.circle.name}}</li> -->
          <li class="is-active"><a href="#">{{book.title}}</a></li>
        </ul>
      </nav>

      <div class="columns _r18" v-if="r18guard">
        <div class="column">
          <p>このページは、18歳未満の方には不適切な表現内容が含まれています。 18歳未満の方のアクセスは固くお断りします。</p>
          <p>あなたは18歳以上ですか？</p>
          <button @click="e=>$store.dispatch('r18/set',1)">はい</button>
          <button @click="e=>$store.dispatch('r18/set',0)">いいえ</button>
        </div>
      </div>

      <div class="columns" v-else>
        <div class="column is-8">
          <ImageViewer
            :main_image="book.main_image_str"
            :samples="book.samples"
          />

        </div>

        <div class="column"></div>

        <div class="column is-3">
          <h1>{{book.title}}</h1>

          <TwitterShare :text="book.title" />

          <div class="_description">
            <div v-html="book.description_html"/>
          </div>

          <div class="_links">
            <div class="_item" v-if="link" v-for="link in book.links">
              <a :href="link.url">{{link_label(link.for)}}</a>
            </div>
          </div>

          <div class="_circleinfo">
            <h2>サークル情報</h2>
            <h3><nuxt-link :to="{name: 'circles-id', params: {id: book.circle.id}}" >{{book.circle.name}}</nuxt-link></h3>
            <a :href="book.circle.twitter" target="_blank" v-if="book.circle.twitter" >
              <span class="icons twitter"><twitter/></span>
            </a>
            <a :href="book.circle.pixiv" target="_blank" v-if="book.circle.pixiv" >
              <span class="icons pixiv"/>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style lang="scss">
#bookShow {
  ._r18 {
    text-align: center;
    p {
      padding: 1em;
    }
  }
  ._mainimage {
    width: 100%;
  }
  ._circleinfo {
    .icons {
      display: block;
      width:2.5em;
      height:2.5em;
      border-radius: 1.25em;
      text-align: center;
      box-sizing: border-box;
      padding-top: .3em;
      svg{
        width: 1.9em;
        fill: #fff;
      }
      &.twitter{
        background-color: #1da1f3;
      }
      &.pixiv {
        background-image: url('/images/pixiv_icon.png');
        background-size: contain;
      }
    }
  }
  .l_tw {
    svg: {
      width: 2em;
    }
  }
}
</style>

<script>
import axios from '~/plugins/axios'

import TwitterShare from '~/components/parts/TwitterShare'
import ImageViewer from '~/components/parts/ImageViewer'
import twitter from '@fa/brands/twitter.svg'

export default {
  components: {
    ImageViewer,
    twitter,
  },
  data() {
    return {
      id: this.$route.params.id,
      book: [],
      link_labels: {
        'tora': 'とらのあな',
        'pixiv': 'Pixiv',
        'meron': 'メロンブックス',
        'booth': 'Booth',
        'website': 'Website',
      }
    }
  },
  computed: {
    r18guard(){
      return this.book.r18 && !this.$store.state.r18.enable
    }
  },
  methods: {
    link_label(l) {
      if(this.link_labels[l]){
        return this.link_labels[l]
      }
      return l
    }
  },
  head () {
    let meta = [
        { hid: 'description', name: 'description', content: this.book.description_short },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'author', name: 'author', content: this.book.circle.name },
        { hid: 'og:url', name: 'og:url', content: process.env.siteUrl+this.$route.fullPath },
        { hid: 'og:title', name: 'og:title', content: this.book.title },
        { hid: 'og:description', name: 'og:description', content: this.book.description_short },
        { hid: 'og:image', name: 'og:image', content: this.book.main_image_str },
      ]
    if(this.book.circle.twitter_id)meta.push({ hid: 'twitter:creator', name: 'twitter:creator', content: '@' + this.book.circle.twitter_id });
    if(this.book.r18)meta.push({ hid: 'rating', name: 'rating', content: 'adult' });
    return {
      title: this.book.title +'['+ this.book.circle.name +'] | Takanam.in',
      meta: meta
    }
  },
  async asyncData ({params,app,error,$sentry}) {
    if(params.data){
      return { book: params.data }
    }
    return app.$axios.get('items/'+params.id)
      .then((res) => {
        return { book: res.data.data }
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
