import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import queryClient from "./query-client";
import router from "@/router";
import App from "@/app.vue";

import "vfonts/FiraCode.css";
import "vfonts/Lato.css";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin, { queryClient });

app.mount("#app");
