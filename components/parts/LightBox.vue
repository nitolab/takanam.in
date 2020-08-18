<template>
  <div v-if="show" class="tlightbox" outer="outer" @click="outerClick" >
<!--     <div class="_ctl _back" @click="back"></div>
    <div class="_ctl _next" @click="next"></div>
 -->
    <div class="_wrap">
      <div class="__content">
        <img :src="current_image"/>
        <div class="__control">
          <span class="___c ___b" v-if="b" @click="back">back</span>
          <span class="___c ___n" v-if="n" @click="next">next</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tlightbox {
  padding: 5em;
  position: fixed;
  display: flex;
  align-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(10,10,10,.4);
  z-index: 3000;

  ._ctl {
    top: 0;
    width: 50%;
    height: 100vh;
    position: fixed;
    z-index: 4000;
  }
  ._back{
    left: 0;
  }
  ._next{
    right: 0;
  }

  ._wrap {
    z-index: 5000;
    padding: .5em;
    background-color:#fff;
    margin: auto;
  }
  .__content {
    text-align: center;
    img {
      max-width: 98%;
      max-height: 85vh;
    }
  }
  .__control{
    .___c{
      text-decoration: underline;
      cursor: pointer;

      &.disabled {
        display:none;
      }
    }
    .___b{
      float: left;
    }
    .___n{
      float: right;
    }
    &:after{
      float: clear;
    }
  }
}
</style>

<script>
export default {
  props: [
    'images',
    'show'
  ],
  data() {
    return {
      current: 0
    }
  },
  computed: {
    current_image() {
      return this.images[this.current]
    },
    n(){
      return this.images.length > this.current + 1
    },
    b(){
      return this.current > 0
    }
  },
  methods: {
    next() {
      if(this.n) return this.current++
    },
    back() {
      if(this.b) this.current--
    },
    outerClick(ev) {
      if(ev.target.getAttribute('outer')!=='outer') return;
      this.$emit('outer')
    },
  }
}
</script>
