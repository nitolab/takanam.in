<template>
  <div class="image_viewer">
    <div>
      <img :src="current" class="_mainimage" />
    </div>
    <div class="samples">
      <div class="_item" v-for="sample in samples">
        <img :src="sample" class="" @click="change" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.image_viewer {
  ._mainimage {
    width: 100%;
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
      current: this.main_image
    }
  },
  methods: {
    change(ev) {
      this.current = ev.target.src
    }
  }
}
</script>

