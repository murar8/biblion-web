import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { getCurrentUser, postsApi } from "./api";

export default createQueryKeyStore({
  users: {
    me: {
      queryKey: null,
      queryFn: getCurrentUser,
    },
  },
  posts: {
    detail: (postId: string) => ({
      queryKey: [postId],
      queryFn: () => postsApi.getPost({ postId }),
    }),
  },
});
