import App from "@/app.vue";
import router from "@/router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import queryClient from "./query-client";

import "vfonts/FiraCode.css";
import "vfonts/Lato.css";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin, { queryClient });

app.mount("#app");
