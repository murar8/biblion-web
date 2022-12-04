import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("@/views/home-view.vue");
const PostView = () => import("@/views/post-view.vue");
const NotFound = () => import("@/views/not-found.vue");

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "Home" },
    },
    {
      path: "/posts/new",
      name: "new-post",
      component: PostView,
      meta: { title: "Create Post" },
    },
    {
      path: "/posts/:id",
      name: "post",
      component: PostView,
      meta: { title: "Post" },
    },
    {
      path: "/not-found",
      name: "not-found",
      component: NotFound,
      meta: { title: "404" },
    },
  ],
});
