import App from "@/app.vue";
import router from "@/router";
import { VueQueryPlugin, type VueQueryPluginOptions } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp, nextTick } from "vue";

import "vfonts/FiraCode.css";
import "vfonts/Lato.css";

router.afterEach((to) => {
  // Set the page title using the route `meta` field.
  // Use next tick to handle router history correctly.
  // See: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  nextTick(() => {
    document.title = typeof to.meta.title === "string" ? to.meta.title : "Biblion";
  });
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  },
};

app.use(VueQueryPlugin, vueQueryOptions);

app.mount("#app");
