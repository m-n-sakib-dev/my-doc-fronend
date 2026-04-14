// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    config: {
      plugins: [require('@tailwindcss/typography')],
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
