// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/ico', href: 'favicon.ico' }
      ]
    }
  },
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  modules: ['@nuxtjs/i18n']
})