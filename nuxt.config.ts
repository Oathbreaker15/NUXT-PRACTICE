// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    server: {
      hmr: {
        port: 3008
      },
      watch: {
        usePolling: true
      }
    }
  },
  css: ['~/assets/styles/main.scss'],
  modules: ['@nuxt/image', '@nuxt/eslint', '@nuxt/test-utils/module',]
})