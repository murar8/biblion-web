import { storeToRefs } from "pinia";
import { createRouter, createWebHistory, type NavigationGuardNext } from "vue-router";
import { useAuthStore } from "./stores/auth";

const HomeView = () => import("@/views/home-view.vue");
const PostView = () => import("@/views/post-view.vue");
const NotFound = () => import("@/views/not-found-view.vue");
const Register = () => import("@/views/register-view.vue");
const Login = () => import("@/views/login-view.vue");
const Verify = () => import("@/views/verify-view.vue");

const isAuthenticatedGuard = (to: unknown, from: unknown, next: NavigationGuardNext) => {
  const { user } = storeToRefs(useAuthStore());
  if (user.value) next();
  else next({ name: "login" });
};

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
      beforeEnter: [isAuthenticatedGuard],
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
      path: "/verify",
      name: "verify",
      component: Verify,
      meta: { title: "Verify your Account" },
      beforeEnter: [isAuthenticatedGuard],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
      meta: { title: "404" },
    },
  ],
});
