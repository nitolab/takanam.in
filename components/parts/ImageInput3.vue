<template>
  <div class="imageInput3">
    <div class="columns">
      <div class="column is-6" v-if="true">
        <div class="_preview" v-if="thumbnail">
          <div
            v-if="thumbnail"
            :style="{'background-image': 'url('+thumbnail+')'}"
            class="___thumbnail" />
        </div>
      </div>
      <div class="column is-6" v-if="true">
        <button class="button is-fullwidth" @click.stop.prevent="reset">もとに戻す</button>
        <button class="button is-fullwidth" @click.stop.prevent="del">削除</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.imageInput3{
  min-height: 3em;
  margin-bottom: 1em;
  .file-label {
    margin: auto;
  }
  .file-cta {
    background-color: #39c337;
    color: #fff;
    svg {
      fill: #fff;
    }
  }
  ._preview {
    width: 100%;
    height: 100px;
    background-color: #333;
    position: relative;
  }
  .___thumbnail {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
}
</style>

<script>
import photo from '~/components/icons/photo'
import trash from '@fa/solid/trash-alt.svg'

export default {
  components: {
    photo,
    trash
  },
  props: [
    'file',
    'default',
  ],
  data() {
    if(this.default){
      return {
        f: null,
        thumbnail: this.default,
      }
    }
    return {
      f: null,
      thumbnail: null,
    }
  },
  methods: {
    onDrop(e) {
      console.log(e)
      let files = e.target.files || e.dataTransfer.files;
      for(let i=0;i<files.length;i++){
        if(['image/jpeg', 'image/png', 'image/gif'].indexOf(files[i])){
          this.f = files[i]
          this.pushImage(files[i])
        }
      }
    },
    del() {
      this.thumbnail = ''
      this.$emit('del')
    },
    reset() {
      this.thumbnail = this.default
      this.$emit('rest')
      this.f = null
    },
    pushImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnail = e.target.result
      };
      reader.readAsDataURL(file);
      this.$emit('input', file)
    },
    delImage(index) {
      this.thumbnail = null
      this.$emit('input', null)
    },
    async sendAction(ev) {
      console.log(ev)
    }
  }
}
</script>

