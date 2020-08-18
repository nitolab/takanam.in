<template>
  <div class="userMenu">
    <label class="_trigger">
      <div class="_button">
        <figure class="image is-48x48">
          <img :src="icon" alt="Placeholder image">
        </figure>
      </div>
      <input type="checkbox" class="_chk" />
      <div class="_menu">
        <ul>
          <!-- <li><p>{{$store.state.session.user.name}}</p></li> -->
          <li><nuxt-link to="/status">Dashbord</nuxt-link></li>
          <li><nuxt-link to="/logout">Logout</nuxt-link></li>
        </ul>
      </div>
      <div class="_overlay"></div>
    </label>
  </div>
</template>

<script>
export default {
  computed: {
    icon(){
      if(this.$store.state.session.logged_in) return this.$store.state.session.user.icon_str;
      return ''
    }
  }
}

</script>

<style lang="scss">
.userMenu {
  ._button {
    min-width: 2.5em;
    min-height:2.5em;
    cursor:pointer;
    img {
      border-radius: 24px;
    }
  }
  ._menu{
    margin-top: .5em;
    position: absolute;
    right: 0;
    border-radius: 5px;
    border: solid #39c337 1px;
    font-size: 1em;
    background-color: #fff;
    display: none;
    width: auto;
    z-index: 20;

    ul {
      list-style: none;
      padding: 0;
    }
    li {
      text-align: center;
      width:100%;
      &:hover {
        background-color: #39c337;
        a {color: #fff}
      }
    }
    a {
      color: #39c337;
      padding: .4em 1.5em;
      width:100%;
      display: block;
    }
  }
  ._chk {
    display: none;
  }
}

.userMenu ._chk:checked + ._menu {
    display: block;
}

.userMenu ._chk:checked + ._menu + ._overlay{
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: .5;
  }
</style>
