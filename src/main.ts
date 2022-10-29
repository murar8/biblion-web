import App from "@/app.vue";
import router from "@/router";
import { createPinia } from "pinia";
import { createApp, nextTick } from "vue";
import { auth0 } from "@/auth0";

import "vfonts/FiraCode.css";
import "vfonts/Lato.css";

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  nextTick(() => {
    document.title = typeof to.meta.title === "string" ? to.meta.title : "Biblion";
  });
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(auth0);

app.mount("#app");
