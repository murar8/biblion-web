import App from "@/app.vue";
import router from "@/router";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { auth0 } from "./auth0";

import "vfonts/FiraCode.css";
import "vfonts/Lato.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(auth0);

app.mount("#app");
