<template>
  <div class="sampleGroup">
    <ImageInput3
      v-for="(sample,k,i) in samples"
      :key="i"
      :default="sample"
      @del="()=>{deletes.push(k);$emit('del',deletes)}"
      @rest="()=>{let a=deletes.indexOf(k);if(a<0)return;deletes.splice(a,1);$emit('del',deletes)}"
    />
    <div v-for="(thumbnail,k) in thumbnails" class="_upfiles">
      <div class="columns">
        <div class="column is-9">
          <div
          v-if="thumbnail"
          :style="{'background-image': 'url('+thumbnail+')'}"
          class="__thumbnail" />
        </div>
        <div class="column is-3">
          <div class="__remove button is-fullwidth" @click.stop.prepend="rm" :num="k">削除</div>
        </div>
      </div>
    </div>
    <div v-if="addition" @change="" >
      <div class="file is-boxed">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            @change="onDrop"
            accept="image/jpeg,image/png,image/gif,.jpeg,.jpg,.png,.gif"
          >
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
              <photo/>
            </span>
            <span class="file-label">
              サンプル画像を追加
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sampleGroup {
  ._upfiles {
    .__thumbnail{
      width: 100%;
      height: 5em;
      background-size: cover;
      background-position: center;
    }
    margin-bottom: 1em;
  }
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
}
</style>

<script>
import ImageInput3 from '~/components/parts/ImageInput3'
export default{
  components: {
    ImageInput3
  },
  props: {
    max: {
      type: Number,
      default: 4
    },
    samples:{
      type: Array,
      default: []
    },
    ver: Number
  },
  data() {
    return {
      deletes: [],
      thumbnails: [],
      files: []
    }
  },
  watch: {
    ver(v) {
      this.deletes = []
      this.thumbnails = []
    }
  },
  methods:{
    rm(e){
      let num = e.target.getAttribute('num')
      if(this.thumbnails.length<num){return}
      this.thumbnails.splice(num,1)
      this.files.splice(num,1)
      this.$emit('add', this.files)
    },
    onDrop(e) {
      let files = e.target.files || e.dataTransfer.files;
      for(let i=0;i<files.length;i++){
        if(['image/jpeg', 'image/png', 'image/gif'].indexOf(files[i])){
          this.f = files[i]
          this.pushImage(files[i])
        }
      }
      e.target.value = ''
    },
    pushImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnails.push(e.target.result)
        this.files.push(file)
        this.$emit('add', this.files)
      };
      reader.readAsDataURL(file);
    }
  },
  computed: {
    current(){
      return
    },
    addition(){
      return this.max - this.samples.length + this.deletes.length - this.files.length > 0
    }
  }
}
</script>
