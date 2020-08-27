const buildVersion = String(Math.floor(Date.now()/1000))
const path = require('path')
const fs = require('fs')

export default {
  server: {
    port: process.env.NUXT_PORT || 3001,
    // host: process.env.NODE_ENV == 'production' ? '0.0.0.0' : '127.0.0.1'
    host: '0.0.0.0',
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3002',
    reCaptcha: process.env.RECAPTCHA || '6Lfsk0gUAAAAAN6eZmbaSJFO51CLckmACm37ieXQ',
    siteUrl: process.env.SITE_URL || 'https://takanam.in',
    buildVersion: buildVersion,
  },

  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Takanam.in',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "絶賛テスト中" },
      { hid: 'twitter:site', name: 'twitter:site', content: '@himura_75' },
      { hid: 'og:url', name: 'og:url', content: process.env.siteUrl },
      { hid: 'og:title', name: 'og:title', content: 'Takanam.in' },
    ],
    link: [
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~plugins/autoRefresh.js', mode: 'client' },
    { src: '~plugins/vue-toast-notification.js', mode: 'client' },
    { src: '~plugins/vue-js-modal.js'},
    { src: '~plugins/tinybox.js'},
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    [
      '@nuxtjs/google-gtag',
      {
        id: process.env.GA_ID,
        debug: false
      }
    ],
    'nuxt-svg-loader',
    '@nuxtjs/device',
  ],

  toast: {
      position: 'top-center',
      register: [
        {
          name: 'my-error',
          message: 'Oops...Something went wrong',
          options: {
            type: 'error'
          }
        }
      ]
  },

  serverMiddleware: [
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3002',
    withCredentials: true,
    timeout: 60000
  },

  sentry: {
    dsn: process.env.NODE_ENV == 'production'? 'https://45b1c53845814fd999e46a9427b20d5e@o216865.ingest.sentry.io/5341532' : 'https://f11c5e9b98c74f2e9bfe40aa3515f3ea@o216865.ingest.sentry.io/5351778',
    config: {},
  },

  build: {
    extend (config, ctx) {
      let path = require('path');
      config.resolve.extensions.push('.svg')
      config.resolve.alias['@font-mfizz'] = path.join(__dirname, 'node_modules/font-mfizz/src/svg')
      config.resolve.alias['@fa'] = path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/svgs')
    }
  },

  hooks: {
    build: {
      before({nuxt}) {
        const versionFile = path.join(
          nuxt.options.rootDir,
          nuxt.options.dir.static,
          'LATEST_BUILD'
        )
        fs.writeFileSync(versionFile, buildVersion)
        console.log('- BUILD VERSION: ' + buildVersion)
      }
    },
  }
}
