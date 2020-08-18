<template>
  <div class="columns">
    <div class="column">
    </div>
    <div class="column is-2 is-mobile">
      {{label}}
    </div>
    <div class="column is-9">
      <input
        class="input"
        type="url"
        placeholder="https://"
        v-model="v"
        v-on:input="$emit('input', $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
export default{
  props: [
    'label',
    'value'
  ],
  data() {
    return {
      v: this.value
    }
  }
}
</script>

<style scoped>
.s {
  /*width: 100%;*/
}
</style>
