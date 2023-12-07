export default {
  head: {
    titleTemplate: '%s - QooeTalaee',
    title: 'QooeTalaee',
    htmlAttrs: {
      lang: 'fa',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['~/assets/styles/global.scss'],
  plugins: [
    { src : '~/services/product', ssr : true},
  ],  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/toast'],
  toast: {
    duration: 3000,
    position: 'top-right',
  },
  axios: {
    baseURL: 'http://ghooetalaee.ir/api',
  },
  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: 'http://ghooetalaee.ir/api',
        endpoints: {
          login: { url: '/admin/auth', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: {
            url: '/auth/me',
            method: 'get',
            propertyName: 'data',
          },
        },
        redirect: {
          login: '/login',
          logout: '/login',
          callback: '/login',
          home: '/',
        },

        token: {
          property: 'access_token',
          maxAge: 60 * 60,
        },
        refreshToken: {
          maxAge: 20160 * 60,
        },
      },
    },
    user: {
      property: 'user',
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
  },

  vuetify: {
    customVariables: ['~/assets/styles/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#D8AB76',
          secondary: '#393743',
          backgroundColor: '#F5F5F5',
          tertiary: '#939393',
          success: '#00BE6E',
          warning: '#DD1B1B',
          gray500 : '#6B7280',
          gray600 : '#8B8B8B',
          gray900 : '#111928',
          grey800 : '#999CA0',
          fijate : '#FA6D6D',
          rozgold :'#FB8A83',
          title : '#143356'
          
        },
      },
    },
  },
  build: {},
}
