import { nextTick } from "vue";
import { createRouter, createWebHistory, type NavigationGuardNext } from "vue-router";
import queryClient from "./query-client";
import queryKeys from "./query-keys";

const EditPostView = () => import("@/views/edit-post-view.vue");
const HomeView = () => import("@/views/home-view.vue");
const Login = () => import("@/views/login-view.vue");
const NotFound = () => import("@/views/not-found-view.vue");
const PostView = () => import("@/views/post-view.vue");
const Register = () => import("@/views/register-view.vue");
const RequestEmailVerification = () => import("@/views/request-email-verification-view.vue");
const ResetPassword = () => import("@/views/reset-password-view.vue");
const UserSettings = () => import("@/views/user-settings-view.vue");
const UserDetails = () => import("@/views/user-details-view.vue");
const VerifyEmail = () => import("@/views/verify-email-view.vue");

const isAuthenticatedGuard = async (to: unknown, from: unknown, next: NavigationGuardNext) => {
  const user = await queryClient.ensureQueryData(queryKeys.users.me);
  if (user) next();
  else next({ name: "login" });
};

const verifiedUserGuard = async (to: unknown, from: unknown, next: NavigationGuardNext) => {
  const user = await queryClient.ensureQueryData(queryKeys.users.me);
  if (user?.verified) next();
  else next({ name: "request-email-verification" });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "Home" },
    },
    {
      path: "/users/:id",
      name: "user",
      component: UserDetails,
      meta: { title: "User Details" },
    },
    {
      path: "/posts/:id",
      name: "post",
      component: PostView,
      meta: { title: "Post" },
    },
    {
      path: "/posts/edit/:id?",
      name: "edit-post",
      component: EditPostView,
      meta: { title: "Edit Post" },
      beforeEnter: [verifiedUserGuard],
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
      path: "/verify/:code",
      name: "verify-email",
      component: VerifyEmail,
      meta: { title: "Verify your Account" },
      beforeEnter: [isAuthenticatedGuard],
    },
    {
      path: "/verify",
      name: "request-email-verification",
      component: RequestEmailVerification,
      meta: { title: "Verify your Account" },
      beforeEnter: [isAuthenticatedGuard],
    },
    {
      path: "/settings",
      name: "settings",
      component: UserSettings,
      meta: { title: "Account Settings" },
      beforeEnter: [isAuthenticatedGuard],
    },
    {
      path: "/reset/:code",
      name: "reset-password",
      component: ResetPassword,
      meta: { title: "Reset your Password" },
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

router.afterEach((to) => {
  // Set the page title using the route `meta` field.
  // Use next tick to handle router history correctly.
  // See: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  nextTick(() => {
    document.title = typeof to.meta.title === "string" ? to.meta.title : "Biblion";
  });
});

export default router;
