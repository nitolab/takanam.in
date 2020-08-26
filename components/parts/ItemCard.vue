<template>
  <div class="ItemCard">
    itemcard
    <h1>{{item.title}}</h1>
    <div class="_wrp">
      <img :src="item.main_image_thumb" />
    </div>
  </div>
</template>

<style lang="scss">
.ItemCard{
  ._wrp {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>

<script>
export default {
  props: {
    item: {
      default: {
        title: '',
        main_image_thumb: '',
      }
    }
  },
  data() {
    return {}
  }
}
</script>
