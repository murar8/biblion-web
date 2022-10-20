import { PostsApi } from "@/generated";
import { computed } from "vue";
import useApiConfig from "./use-api-config";

export default function usePostsApi() {
  const configRef = useApiConfig();
  return computed(() => new PostsApi(configRef.value));
}
