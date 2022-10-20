import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("./views/home-view.vue");
const PostView = () => import("./views/post-view.vue");

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posts/:id",
      name: "post",
      component: PostView,
    },
  ],
});
