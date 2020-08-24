<template>
  <div class="imageInputForm2">
    <div class="columns">
      <div class="column is-8">
        <div class="_preview" v-if="thumbnail">
          <div
            v-if="thumbnail"
            :style="{'background-image': 'url('+thumbnail+')'}"
            class="__thumbnail" />
        </div>
        <div class="file is-boxed" v-if="!file && !thumbnail">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              name="resume"
              accept="image/jpeg,image/png,image/gif,.jpeg,.jpg,.png,.gif"
              @change="onDrop"
            >
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
                <photo/>
              </span>
              <span class="file-label">
                画像を追加
              </span>
            </span>
          </label>
        </div>
      </div>
      <div class="column is-4">
          <button class="button is-fullwidth" v-if="true" @click.stop.prevent="reset">もとに戻す</button>
          <button class="button is-fullwidth" v-if="thumbnail" @click.stop.prevent="del">削除</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.imageInputForm2{
  min-height: 3em;
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
  .__thumbnail {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
}
</style>

<script>
import photo from '~/components/icons/photo'

export default {
  components: {
    photo,
  },
  props: {
    file: { default: null},
    default: { default:null },
  },
  data() {
    return {
      f: null,
      thumbnail: this.default,
    }
  },
  mounted(){
    this.thumbnail = this.default
  },
  watch: {
    default(v) {
      this.reset()
      this.thumbnail = v
    }
  },
  methods: {
    onDrop(e) {
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
      this.$emit('input', '!delete')
    },
    reset() {
      this.thumbnail = this.default
      this.$emit('input', null)
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
    }
  }
}
</script>

