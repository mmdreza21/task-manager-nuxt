// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";
import { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  devServer: { host: "0.0.0.0" },
  css: [
    "@/assets/styles/glass-theme.css",
    "~/assets/styles/style.css",
    "persian-datepicker/dist/css/persian-datepicker.min.css",
  ],
  devtools: { enabled: true },
  routeRules: {
    "/profile/reset-password": { ssr: false },
    "/**/*.data.br": {
      headers: {
        "Content-Encoding": "br",
        "Content-Type": "application/octet-stream",
      },
    },
    "/**/*.framework.js.br": {
      headers: {
        "Content-Encoding": "br",
        "Content-Type": "application/javascript",
      },
    },
    "/**/*.wasm.br": {
      headers: {
        "Content-Encoding": "br",
        "Content-Type": "application/wasm",
      },
    },
  },
  plugins: [
    { src: "~/plugins/apiClient.ts" },
    { src: "~/plugins/vuetify.ts" },
    { src: "~/plugins/moment.ts" },
    { src: "~/plugins/jMoment.ts" },
  ],
  build: {
    transpile: ["vuetify", "@alireza-ab/vue-persian-datepicker"],
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  app: {
    head: {
      titleTemplate: "task manager",
      htmlAttrs: {
        lang: "fa",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [],
    },
  },

  compatibilityDate: "2024-07-27",

  runtimeConfig: {
    public: {
      BASEURL: process.env.BASEURL || "http://localhost:8080",
      proxy: "",
    }
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
  nitro: {
    routeRules: {
      "/socket.io/**": { proxy: process.env.PROXY },
    },
  },
});