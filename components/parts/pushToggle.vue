<template>
  <div class="form-toggle">
    <label :for="'sw-push'" class="clickable" :class="{checked: isSubscribed}">
    <input type="checkbox" class="sw" :id="'sw-push'" v-model="isSubscribed" v-on:change="change" />
    </label>
  </div>
</template>

<script>
import {subscribe, unsubscribe, isSubscribed} from '~/plugins/sw'
export default {
  props: [
  ],
  data() {
    return {
      processing: false,
      success: false,
      isSubscribed: false,
      enableSubscribe: false
    }
  },
  mounted() {
    if(process.client){
      isSubscribed(this.pushInit)
    }
  },
  methods: {
    pushInit(sub) {
      this.isSubscribed = !(sub === null)
      this.enableSubscribe = true
    },
    subscribe() {
      subscribe('BBb3czMP2oFrYBERQDk04iZJuiIVY8S4F1RLVy8eWJQ7Y1FrXte9r6pu7jD802LV8MnIIrSfT0x03zzYzh4yARY')
        .then(this.sb)
    },
    async sb(s) {
      this.$axios.$post('user/push',
        s.toJSON(),
        {headers:{'x-api-key': this.$store.state.session.token}}
      ).then(r=>{
        console.log(r)
      })
    },
    async change(ev) {
      this.processing = true;
      if(this.isSubscribed) {
        this.subscribe()
      }else{
        unsubscribe()
      }
    }
  }
}
</script>

<style lang="scss">
$form-checked-color: #39c337;
$form-unchecked-color: #fb6b6b;

.form-toggle {
  .sw {
    display: none;
  }
  label {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 26px;
    color: transparent;
    background-color: $form-unchecked-color;
    border-radius: 15px;
    cursor: pointer;
    &:before {
      display: block;
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      background-color: #fff;
      border-radius: 10px;
      transition: 0.4s;
    }
  }
  label.checked {
    background-color: $form-checked-color;
    &:before {
      left: 27px;
    }
  }
  &.clickable {
    cursor: pointer;
  }
}
</style>
