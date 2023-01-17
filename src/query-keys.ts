import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import type { MaybeRef } from "@vueuse/shared";
import { unref } from "vue";
import { postsApi, usersApi } from "./api";
import { ResponseError, type GetPostsRequest } from "./generated";

export default createQueryKeyStore({
  users: {
    me: {
      queryKey: null,
      queryFn: async () => {
        try {
          return await usersApi.getCurrentUser();
        } catch (error) {
          if (error instanceof ResponseError && error.response.status === 401) {
            return null;
          } else {
            throw error;
          }
        }
      },
    },
    detail: (userId: MaybeRef<string>) => ({
      queryKey: [userId],
      queryFn: () => usersApi.getUser({ userId: unref(userId) }),
    }),
  },
  posts: {
    detail: (postId: MaybeRef<string>) => ({
      queryKey: [postId],
      queryFn: () => postsApi.getPost({ postId: unref(postId) }),
    }),
    list: (request: MaybeRef<Omit<GetPostsRequest, "skip">>) => ({
      queryKey: [request],
      queryFn: ({ pageParam = 0 }: { pageParam?: number }) => {
        const { limit = 0, ...args } = unref(request);
        return postsApi.getPosts({ ...args, limit, skip: pageParam * limit });
      },
    }),
  },
});
