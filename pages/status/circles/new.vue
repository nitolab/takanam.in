<template>
  <div>
    <MainHeader/>
    <div class="wrp container">
      <div class="columns is-3-desktop">
        <div class="column is-3">
          <StatusNav/>
        </div>
        <div class=" column is-9 pr-6 pl-6">
          <h2>サークル登録</h2>
          <circleForm v-if="!success" @success="done" />

          <div class="_success" v-if="success">
            <div class="__icon"><check/></div>
            <p>サークル作成完了です。</p>
            <p><nuxt-link :to="{ name: 'status-items-new' }" >アイテム追加ページ</nuxt-link>に移動して同人誌を追加しましょう。</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import circleForm from '~/components/circleForm'
import check from '@fa/solid/check.svg'

export default {
  middleware: 'session',
  components: {
    circleForm,
    check
  },
  data() {
    return {
      success: false,
      id: null,
    }
  },
  methods: {
    done(id){
      if(id){
        this.success = true
        this.id = id
      }else{
        this.success = false
        this.id = null
      }
    }
  }
}
</script>

<style lang="scss">
  ._success {
    padding: 5em 1em;
    background-color: #39c337;
    color: #fff;
    text-align: center;

    svg {
      fill: #fff;
      width: 4em;
    }
    .__icon {
      padding-bottom: 2em;
    }
  }
</style>
