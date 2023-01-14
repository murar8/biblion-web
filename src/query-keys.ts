import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import type { MaybeRef } from "@vueuse/shared";
import { unref } from "vue";
import { getCurrentUser, postsApi, usersApi } from "./api";

export default createQueryKeyStore({
  users: {
    me: {
      queryKey: null,
      queryFn: getCurrentUser,
    },
    detail: (userId: MaybeRef<string>) => ({
      queryKey: [userId],
      queryFn: () => usersApi.getUser({ userId: unref(userId) }),
    }),
  },
  posts: {
    detail: (postId: string) => ({
      queryKey: [postId],
      queryFn: () => postsApi.getPost({ postId }),
    }),
  },
});
