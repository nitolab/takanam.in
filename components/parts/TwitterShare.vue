<template>
  <a :href="url" target="_blank">
    <button class="twitter_share">
      <twitter/>
      <span>Share</span>
    </button>
  </a>
</template>

<style lang="scss">
.twitter_share {
  background-color: #1da1f3;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  svg {
    // fill: #1da1f3;
    fill: #fff;
  }
  span{
    color: #fff;
  }
  &:focus {
    border: none;
    outline: none;
  }
}
</style>

<script>
import twitter from '~/components/icons/twitter'
export default{
  components: {
    twitter
  },
  props: [
    'text'
  ],
  computed: {
    url() {
      let ref = encodeURIComponent(process.env.siteUrl+this.$route.fullPath)
      let params = [
        'ref_src=twsrc%5Etfw',
        'text=' + encodeURIComponent(this.text),
        'tw_p=tweetbutton',
        'original_referer=' + ref,
        'url=' + ref,
      ]
      return 'https://twitter.com/intent/tweet?' + params.join('&')
    }
  },
  mounted() {

      console.log(this.url)
  }
}
</script>
