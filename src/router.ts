import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("@/views/home-view.vue");
const PostView = () => import("@/views/post-view.vue");
const NotFound = () => import("@/views/not-found-view.vue");
const Register = () => import("@/views/register-view.vue");
const Login = () => import("@/views/login-view.vue");

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
      path: "/register",
      name: "register",
      component: Register,
      meta: { title: "Create Account" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { title: "Login" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
      meta: { title: "404" },
    },
  ],
});
