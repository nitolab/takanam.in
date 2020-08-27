<template>
  <div class="ItemCard">
    <h1>{{item.title}}</h1>
    <h2 v-if="circle&&circle.name">{{circle.name}}</h2>
    <div class="_wrp">
      <img :src="item.main_image_thumb" />
    </div>
  </div>
</template>

<style lang="scss">
.ItemCard{
  height: 300px;
  h1 {
    color: #333;
  }
  ._wrp {
    text-align: center;
    img {
      width:auto;
      height:auto;
      max-width:100%;
      max-height:250px;
      vertical-align: middle;
    }
  }
}
</style>

<script>
export default {
  props: {
    circle: {
      default: {
        name: false
      }
    },
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
