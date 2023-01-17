import { Configuration, PostsApi, UsersApi } from "./generated";

const configuration = new Configuration({
  basePath: import.meta.env.VITE_API_URL,
  credentials: "include",
});

export const usersApi = new UsersApi(configuration);

export const postsApi = new PostsApi(configuration);
