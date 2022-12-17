import { Configuration, PostsApi, ResponseError, UsersApi } from "./generated";

const configuration = new Configuration({
  basePath: import.meta.env.VITE_API_URL,
  credentials: "include",
});

export const usersApi = new UsersApi(configuration);

export const postsApi = new PostsApi(configuration);

export async function getCurrentUser() {
  try {
    return await usersApi.getCurrentUser();
  } catch (error) {
    if (error instanceof ResponseError && error.response.status === 401) {
      return null;
    } else {
      throw error;
    }
  }
}
