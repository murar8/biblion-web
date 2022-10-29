import type { CreatePostRequest, PostResponse } from "@/generated";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const usePostStore = defineStore("post", () => {
  const post = reactive<PostResponse | CreatePostRequest>({
    content: "",
  });

  return { post };
});
