<template>
  <div class="container" id="ping">
    <dl>
      <dt>version:</dt><dd><code v-html="version" /></dd>
      <dt>baseUrl:</dt><dd><code v-html="baseURL" /></dd>
      <dt>async_baseURL:</dt><dd><code v-html="async_baseURL" /></dd>
      <dt>session:</dt><dd><code v-html="$store.state.session.token || 'null'"/></dd>
      <dt>user:</dt><dd><code v-html="readable_json"/></dd>
      <dt>show R-18 content:</dt><dd><code>{{$store.state.r18.enable ? 'yes' : 'no'}}</code></dd>
      <dt>exist created in server:</dt><dd><code v-html="created_is_server" /></dd>
      <dt>mounted in server:</dt><dd><code v-html="mounted_is_server" /></dd>
      <dt>server ping:</dt><dd><code v-html="async_ping_result" /></dd>
      <dt>ping in server:</dt><dd><code v-html="async_is_server" /></dd>
    </dl>
    <center> - <nuxt-link to='/'>home</nuxt-link> - </center>
  </div>
</template>

<style lang="scss">
  #ping {
    background-color: #fff;
    padding: 2em;
    p,
    code {
      word-wrap: break-word;
      display:block;
      width: 100%;
      padding: 1em;
      background-color: #333;
      color:#3dfd50;
      min-height: 1em;
    }
    dl {
      padding: 1em 0;
    }
    dt {
      padding-top:.5em;
      font-weight: bold;
    }
    dd {
      padding-left: 1em;
    }
  }
</style>

<script>
export default{
  head: {
    bodyAttrs: {
      class: 'fill takanami'
    }
  },
  data() {
    return {
      baseUrl: '',
      mounted_is_server:null,
      created_is_server:false,
      version: process.env.buildVersion
    }
  },
  computed: {
    readable_json() {
      return JSON.stringify(this.$store.state.session.user,null,2);
    }
  },
  created() {
    if(process.server) this.created_is_server = process.server
    this.baseURL = process.env.baseUrl
  },
  mounted() {
    this.mounted_is_server = process.server
  },
  async asyncData({app})
  {
    try {
      const r = await app.$axios.get('ping')
      return {
        async_is_server: process.server,
        async_ping_result: r.status,
        async_baseURL: process.env.baseUrl,
      }
    }catch(e){
      let status = (e.response)? e.response.status : 'error'
      return {
        async_is_server: process.server,
        async_baseURL: process.env.baseUrl,
        async_ping_result: status
      }
    }
  }
}
</script>
