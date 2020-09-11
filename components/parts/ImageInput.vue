<template>
  <div class="imageInputForm">
    <div class="columns">
      <div class="column is-12" v-if="thumbnail">
        <div class="_preview">
          <div
            v-if="thumbnail"
            :style="{'background-image': 'url('+thumbnail+')'}"
            class="__thumbnail" />
          <div class="__i"><trash/></div>
          <div class="__hover" v-if="thumbnail" @click="delImage"></div>
        </div>
      </div>
      <div class="column is-12" v-if="!thumbnail">
        <div class="file is-boxed">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" @change="onDrop">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
                <photo/>
              </span>
              <span class="file-label">
                Add Image
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>
    {{file}}
  </div>
</template>

<style lang="scss">
.imageInputForm{
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

    .__hover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      opacity: 0;

      &:hover {
        cursor:pointer;
        opacity: .3;
      }
    }
    .__i{
      position: absolute;
      top:0;
      background-color: green;
      width: 3em;
      padding: 1em;
      opacity: .8;
      svg {
        fill: #fff;
        width: 1.2em;
      }
    }
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
      const files = e.target.files || e.dataTransfer.files;
      for(let i=0;i<files.length;i++){
        if(['image/jpeg', 'image/png', 'image/gif'].indexOf(files[i])){
          this.f = files[i]
          this.pushImage(files[i])
        }
      }
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

