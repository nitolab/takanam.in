<template>
  <Nuxt />
</template>

<style lang="scss">
$mainColor: green;

html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

$green: #39c337;

body {
  // background-color: #fff;
  background-color: #39c337;
  &.fill {
    width: 100%;
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display:none;
    }
    &.takanami{
      background-color: #39c337;
    }
  }
}
.wrp {
  background-color: #fff;
  padding-top: 2em;
  // min-height: calc(100vh - 150px);
  min-height: 90vh;
  padding-left: 1em;
  padding-right: 1em;
  box-sizing: inherit;
}
.dcontainer {
  width: 1200px;
}
</style>

<script>
</script>
