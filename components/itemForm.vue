<template>
  <div id="itemform">
    <form v-on:submit.prevent="sendAction">
      <div class="field">
        <label class="label">出展サークル</label>
        <div class="control">
          <div class="select">
            <select v-model="circle_id" required>
              <option v-for="circle in circles" :value="circle.id">{{circle.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <ImageInput2 v-model="image_file" :default="image" />
      </div>

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="name" required v-model="title">
        </div>
      </div>

      <div class="field">
        <label class="label">description</label>
        <div class="control">
          <textarea class="textarea" placeholder="description" v-model="description" required></textarea>
        </div>
      </div>

      <div class="field">
        <label class="checkbox">これはR-18コンテントです
          <input type="checkbox" v-model="r18" />
        </label>
      </div>

      <div class="field">
        <UrlInput label="ウェブサイト" v-model:value="urls.website" />
        <UrlInput label="とらのあな" v-model:value="urls.tora" />
        <UrlInput label="メロンブックス" v-model:value="urls.meron" />
        <UrlInput label="Booth" v-model:value="urls.booth" />
        <UrlInput label="Pixiv" v-model:value="urls.pixiv" />
      </div>

      <div class="field" v-if="!isnew">
        <SampleInput
          :max="4"
          @del="f=>sample_deletes=f"
          @add="f=>sample_addOns=f"
          :samples="samples"
          :ver="ver"
        />
      </div>

      <button
        class="button is-fullwidth is-primary"
        :class="{'is-loading': loading}"
      >submit</button>
    </form>
    <div class="_hov" v-if="loading"></div>
  </div>
</template>

<script>
import SampleInput from '~/components/parts/SampleInput'
import UrlInput from '~/components/parts/UrlInput'

export default {
  components: {
    UrlInput,
    SampleInput,
  },
  props: [
    'circles',
    'item'
  ],
  data() {
    return {
      loading: false,
      success: true,
      ver: (new Date()).getTime(),
      id: null,
      circle_id: 0,
      description: '',
      title: '',
      image_file: null,
      image: false,
      samples: [],
      sample_deletes: [],
      sample_addOns: [],
      r18: false,
      urls: {
        website: '',
        tora: '',
        meron: '',
        booth: '',
        pixiv: '',
      }
    }
  },
  computed: {
    isnew() {
      return !this.id
    }
  },
  mounted() {
    this.refresh(this.item)
  },
  methods: {
    refresh(item) {
      if(item) {
        this.ver = (new Date()).getTime()
        this.id = item.id
        this.circle_id = item.circle_id
        this.description = item.description
        this.title = item.title
        this.image_file = null
        this.image = item.main_image_str
        this.r18 = item.r18
        this.samples = item.samples
        this.sample_deletes = []
        this.sample_addOns = []
        this.urls = {
          website: item.urls.website,
          tora: item.urls.tora,
          meron: item.urls.meron,
          booth: item.urls.booth,
        }
      }
    },
    async sendAction() {
      if(this.loading)return;
      try {
        this.loading = true;

        let fd = new FormData();

        fd.append('item[circle_id]', this.circle_id)
        fd.append('item[title]', this.title)
        fd.append('item[description]', this.description)
        fd.append('item[r18]', this.r18)

        if(this.image_file) {
          fd.append('item[image]', this.image_file)
        }
        for(let i=0;this.sample_addOns.length>i;i++){
          fd.append('sample_images[additions][]', this.sample_addOns[i])
        }
        for(let i=0;this.sample_deletes.length>i;i++){
          fd.append('sample_images[deletions][]', this.sample_deletes[i])
        }

        fd.append('urls[tora]', this.urls.tora)
        fd.append('urls[meron]', this.urls.meron)
        fd.append('urls[booth]', this.urls.booth)
        fd.append('urls[pixiv]', this.urls.pixiv)
        fd.append('urls[website]', this.urls.website)

        let r;
        if(!this.isnew){
          r = await this.$axios.put(
            'user/items/'+this.id,
            fd,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-api-key': this.$store.state.session.token
              }
            }
          )
          this.refresh(r.data.data)
        }else{
          r = await this.$axios.post(
            'user/items',
            fd,
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
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
#itemform{
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
