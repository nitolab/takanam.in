<template>
  <div class="image_viewer">

    <Tinybox
        :images="images"
        :index="index"
        @close="index=null"
        @change="(i) => {index = i}"
    />
    <div class="main" @click="index=0">
      <img :src="current" class="_mainimage" />
    </div>

   <div class="samples">
      <div class="_item" v-for="(sample,i) in samples">
        <img :src="sample" class="" @click="index=i+1" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.image_viewer {
  .main{
    width:100%;
    height:600px;
    position: relative;
    cursor: pointer;
    img{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      width: auto;
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }
  }
  .samples {
    background-color: #999;
    ._item {
      display: inline;
      cursor: pointer;
      img {
        max-height: 6em;
      }
    }
  }
}
</style>

<script>
export default{
  props: [
    'main_image',
    'samples'
  ],
  data(){
    return {
      current: this.main_image,
      index: null
    }
  },
  computed: {
    images(){
      return [this.main_image].concat(this.samples)
    }
  },
  methods: {
    change(ev) {
      this.current = ev.target.src
    }
  }
}
</script>

