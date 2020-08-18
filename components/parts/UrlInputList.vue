<template>
  <div class="field">
    <div v-for="(item, k) in items">
      <UrlInput />
    </div>
  </div>
</template>

<script>
import UrlInput from '~/components/parts/UrlInput'
export default{
  components: {
    UrlInput
  },
  props: [
    'max',
  ],
  data() {
    return {
      urls: []
    }
  },
  computed: {
    items() {
      return this.urls + [1]
    }
  }
}
</script>

