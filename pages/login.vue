<template>
  <div id="loginPage">
    <div class="_wrp">
      <div class="_w">
        <h1 class="_t"><nuxt-link to="/">Takanam.in</nuxt-link></h1>
        <LoginWithTwitterButton :register="false" :enable="true" />
      </div>
      <div class="_or"><strong>or</strong></div>
      <div class="_w">
        <div class="fr">
          <label><span><nuxt-link to="/policy" target="_blank">利用規約</nuxt-link>に同意する</span>
            <input type="checkbox" required="" v-model="agree" />
          </label>
        </div>
        <LoginWithTwitterButton :register="true" :enable="agree" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginWithTwitterButton from '~/components/parts/LoginWithTwitterButton'

export default {
  components: {
    LoginWithTwitterButton,
  },
  data() {
    return {
      agree: false
    }
  },
  head: {
    bodyAttrs: {
      class: 'fill takanami'
    }
  },
}
</script>

<style lang="scss">
$green: #39c337;

#loginPage {
  width: 100%;
  height: 90vh;
  display: flex;
  align-content: center;

  ._wrp {
    margin:auto;
    width: 400px;
  }

  ._or {
    position: absolute;
    width:2em;
    height:2em;
    border-radius:1em;
    background-color:$green;
    margin-top: -0.5em;
    margin-left: 182px;
    &>strong{
      display:block;
      color: #fff;
      margin-top:2px;
      text-align:center;
    }
  }

  ._t {
    font-size: 2.5em;
    font-weight:300;
    text-align:center;
    padding-bottom: .3em;

    a{
      text-decoration: none;
      color: $green;
    }
  }

  ._w{
    margin-top: 1em;
    padding: 1em;
    background-color: #fff;
    border:solid 1px $green;
    border-radius: .5em;

    .fr{
      text-align: center;
      padding-bottom: .3em;
    }

  }

  .l {
    padding-bottom: .5em;
  }

  ._l {
    text-align: center;
  }
}
</style>
