<template>
  <footer id="mainfoot" class="footer">
    <div class="container">
      <div class="columns">
        <div class="column">

          <div >
            <strong id="footTitle"><nuxt-link to="/">Takanami</nuxt-link></strong>
          </div>

          <div class="listInline respects">
            <ul>
              <li><a href="https://github.com/nc30/sateraito_nagoya_2"><github /></a></li>
              <li><a href="https://www.archlinux.jp/"><ArchLinux/></a></li>
              <li><a href="https://www.debian.or.jp/"><Debian/></a></li>
              <li><a href="https://railsguides.jp/"><Rails/></a></li>
              <li><a href="https://nginx.org/"><Nginx/></a></li>
              <li><a href="http://zsh.sourceforge.net/"><Shell/></a></li>
            </ul>
          </div>
        </div>

        <nav id="footMenu" class="column">
          <ul>
            <li>- <nuxt-link to="/about">About</nuxt-link></li>
            <li>- <nuxt-link to="/policy">利用規約</nuxt-link></li>
            <li>- <nuxt-link to="/ping">ping</nuxt-link></li>
          </ul>
        </nav>

        <nav id="footMenu2" class="column">
          <ul>
            <li>- <a href="https://twitter.com/himura_75">Twitter</a></li>
          </ul>
        </nav>
      </div>

      <div id="copylight">
        © 2020 Asahi Himura.
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
$green: #b6f5cc;
#footTitle {
  color: $green;
  font-size: 2em;
  font-weight: bold;
}
#copylight {
  font-size: .8em;
}
#mainfoot {
  border-top: #99ff74 2px solid;
  width: 100%;
  color: $green;
  min-height: 100px;
  a {
    color: $green;
    text-decoration: none;
  }
  .respects {
    margin: .2em auto;
    padding-top: .5em;
    ul {
      padding: 0;
    }
    li {
      display: inline;
      padding-left: 0.8em;
      svg {
        width: 1em;
        height: 1em;
      }
      path {
        fill: $green;
      }
      a {
        font-size: 1.9em;
      }
    }
  }
  #footMenu {
    h3 strong{
      color: #ddd;
      font-weight: bold;
    }
    li {
      padding-bottom: .2em;
    }
  }
}
</style>

<script>
import ArchLinux from '@font-mfizz/archlinux.svg'
import Nginx from '@font-mfizz/nginx.svg'
import Shell from '@font-mfizz/shell.svg'
import Debian from '@font-mfizz/debian.svg'
import Rails from '@font-mfizz/ruby-on-rails.svg'

import github from '@fa/brands/github.svg'

export default {
  components: {
    github,
    ArchLinux,
    Nginx,
    Shell,
    Debian,
    Rails
  }
}
</script>
