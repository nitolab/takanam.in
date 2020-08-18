<template>
  <div class="form-toggle">
    <label :for="'sw-'+name" class="clickable" :class="{checked: status}">
    <input type="checkbox" class="sw" :id="'sw-'+name" v-model="status" v-on:change="change" />
    </label>
  </div>
</template>

<script>
export default {
  props: [
    'name',
    'state',
    'item_id',
  ],
  data() {
    return {
      status: this.state,
      processing: false,
      success: false,
    }
  },
  methods: {
    async change(ev) {
      try {
        this.processing = true;
        this.success = false;
        const r = await this.$axios.$put(
          'user/items/'+this.item_id,
          {
            item:{
              enable: this.status,
            }
          },
          {
            headers: {
              'x-api-key': this.$store.state.session.token
            }
          }
        )
        this.processing = false;
        this.success = true

        this.status = r.data.enable
        this.$emit('success', r.data.data.id)
      } catch(e) {
        if(e.response) {
          this.status = !this.status
        }
        this.$sentry.captureException(e)
        this.$emit('error', e)
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
