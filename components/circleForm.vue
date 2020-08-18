<template>
  <div id="circleForm">
    <form v-on:submit.prevent="sendAction" >
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Circle Name" v-model="name" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <textarea class="textarea" placeholder="description" v-model="description"></textarea>
      </div>

      <div class="field">
        <label class="label">Twitter ID</label>
        <input type="text" class="input" placeholder="@" v-model="twitter_id" />
        <label class="label">Pixiv ID</label>
        <input type="text" class="input" placeholder="@" v-model="pixiv_id" />
      </div>

  <!--     <div class="field">
        <label class="label">関連URL</label>

        <UrlInput label="Pixiv" v-model:value="urls.pixiv" />
        <UrlInput label="Booth" v-model:value="urls.booth" />
        <UrlInput label="とら" v-model:value="urls.tora" />
        <UrlInput label="メロン" v-model:value="urls.meron" />
        <UrlInput label="WebSite" v-model:value="urls.website" />
      </div>
   -->

      <button
        class="button is-fullwidth is-primary"
        :class="{'is-loading': loading}"
      >submit</button>
    </form>
    <div class="_hov" v-if="loading"></div>
  </div>
</template>

<style lang="scss">
#circleForm {
  position: relative;
  >form {
    padding:1em;
  }

  ._hov {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(255,255,255,.8);
    top:0;
  }
}

</style>

<script>
import UrlInput from '~/components/parts/UrlInput'

export default {
  middleware: 'session',
  components: {
    UrlInput,
  },
  props: [
    'circle'
  ],
  data() {
    if(this.circle) {
      return {
        loading: false,
        id: this.circle.id,
        name: this.circle.name,
        description: this.circle.description,
        twitter_id: this.circle.twitter_id,
        pixiv_id: this.circle.pixiv_id,
        urls: {
          tora: this.circle.urls.tora,
          meron: this.circle.urls.meron,
          pixiv: this.circle.urls.pixiv,
          booth: this.circle.urls.booth,
          website: this.circle.urls.website,
        }
      }
    }
    return {
      loading: false,
      id: null,
      name: '',
      description: '',
      twitter_id: '',
      pixiv_id: '',
      urls: {
        tora: '',
        meron: '',
        pixiv: '',
        booth: '',
        website: '',
      }
    }
  },
  methods: {
    async sendAction() {
      try {
        this.loading = true;

        let formData = new FormData();
        formData.append('circle[name]', this.name)
        formData.append('circle[description]', this.description)
        formData.append('circle[twitter_id]', this.twitter_id)
        formData.append('circle[pixiv_id]', this.pixiv_id)
        // formData.append('urls[tora]', this.urls.tora)
        // formData.append('urls[meron]', this.urls.meron)
        // formData.append('urls[pixiv]', this.urls.pixiv)
        // formData.append('urls[booth]', this.urls.booth)
        // formData.append('urls[website]', this.urls.website)

        let r;
        if(this.id){
          r = await this.$axios.put(
            'user/circles/' + this.id,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-api-key': this.$store.state.session.token
              }
            }
          )
        }else{
          r = await this.$axios.post(
            'user/circles',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-api-key': this.$store.state.session.token
              }
            }
          )
        }

        let msg = 'Success!'
        if(r.data.message){
          msg = r.data.message
        }
        this.$toast.success(msg, {})

        this.success = true
        this.$emit('success', r.data.data.id)
      } catch(e) {
        let msg = 'エラーが発生したかも'
        if(e.response.data.errors){
          msg = e.response.data.errors[0]
        }
        this.$toast.error(msg, {})
        this.$sentry.captureException(e)
      }
      this.loading = false;
    }
  }
}
</script>
