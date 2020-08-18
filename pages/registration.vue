<template>
  <div id="registerPage">
    <div class="_wrp">
      <div class="_w">
        <h1 class="_t">Register</h1>

        <registerForm/>
      </div>
    </div>
  </div>
</template>

<script>
import registerForm from '~/components/registerForm'

export default {
  components: {
    registerForm,
  },
  head: {
    bodyAttrs: {
      class: 'fill takanami'
    }
  }
}
</script>

<style lang="scss">
$green: #39c337;
#registerPage {
  width: 100%;
  height: 90vh;
  display: flex;
  align-content: center;

  & > ._wrp{
    margin:auto;
    width: 400px;
    min-height: 100px;
    padding: 1em;
    background-color: #fff;
    border-radius: .5em;

    ._t {
      font-size: 2.5em;
      font-weight:300;
      text-align:center;
      color: $green;
      padding-bottom: .3em;
    }
  }
}
</style>
