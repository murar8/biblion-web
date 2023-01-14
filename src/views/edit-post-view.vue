<script lang="ts">
export default {
  async beforeRouteEnter(to, from, next) {
    try {
      if (to.params.id) {
        to.meta.post = await queryClient.ensureQueryData(queryKeys.posts.detail(to.params.id as string));
      }
      next();
    } catch (error) {
      if (error instanceof ResponseError && error.response.status === 404) {
        next({ name: "not-found" });
      } else {
        throw error;
      }
    }
  },
};
</script>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { NButton, NIcon, NInput, NSelect, NSpace, type SelectOption } from "naive-ui";
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { postsApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import { ResponseError, type CreatePostRequest, type PostResponse } from "@/generated";
import languageNames from "@/language-names";
import type { LanguageSupportMode } from "@/language-support";
import queryClient from "@/query-client";
import queryKeys from "@/query-keys";
import router from "@/router";

const languageOptions = computed<SelectOption[]>(() =>
  Object.entries(languageNames)
    .sort(([, a], [, b]) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map(([value, label]) => ({ value, label }))
);

const route = useRoute();

const existingPost = route.meta.post as PostResponse | undefined;

const post = reactive<CreatePostRequest>({
  content: existingPost?.content || "",
  name: existingPost?.name,
  language: existingPost?.language,
});

const {
  mutate: savePost,
  isLoading: isSaving,
  error: saveError,
} = useMutation({
  mutationFn: async () => {
    return existingPost
      ? postsApi.updatePost({ postId: existingPost.id, createPostRequest: post })
      : postsApi.createPost({ createPostRequest: post });
  },
  onSuccess: (data) => {
    queryClient.setQueryData(queryKeys.posts.detail(data.id).queryKey, data);
    Object.assign(post, data);
    router.push({ name: "post", params: { id: data.id } });
  },
});

const {
  mutate: deletePost,
  isLoading: isDeleting,
  error: deleteError,
} = useMutation({
  mutationFn: async () => {
    await postsApi.deletePost({ postId: existingPost!.id });
  },
  onSuccess: async () => {
    await router.push({ name: "home", replace: true });
  },
});

const error = computed(() => saveError.value || deleteError.value);
const errorMessage = useErrorMessage(error);
</script>

<template>
  <n-space vertical class="container" :wrap-item="false" size="large">
    <n-space :wrap-item="false" size="large">
      <n-input v-model:value="post.name" type="text" placeholder="Name" class="name-input" />

      <n-select
        v-model:value="post.language"
        clearable
        filterable
        placeholder="Language"
        class="language-select"
        :options="languageOptions"
      />
    </n-space>

    <v-editor
      v-model="post.content"
      :language="(post.language as LanguageSupportMode)"
      placeholder="Content"
      style="flex: 1"
    />

    <v-error-collapse :error-message="errorMessage" />

    <n-space justify="space-evenly" item-style="flex: 1">
      <n-button
        :disabled="!post.content"
        round
        :loading="isSaving"
        :type="saveError ? 'error' : 'primary'"
        style="width: 100%"
        @click="savePost()"
      >
        <template #icon>
          <n-icon>
            <fa-exclamation-circle v-if="saveError" />
            <fa-save v-else />
          </n-icon>
        </template>

        <template #default> Save </template>
      </n-button>

      <n-button v-if="existingPost" :loading="isDeleting" round type="error" style="width: 100%" @click="deletePost()">
        <template #icon>
          <n-icon>
            <fa-exclamation-circle v-if="deleteError" />
            <fa-trash v-else />
          </n-icon>
        </template>

        <template #default> Delete </template>
      </n-button>
    </n-space>
  </n-space>
</template>

<style scoped>
.container {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}

.name-input {
  flex: 10000;
  min-width: 128px;
}

.language-select {
  flex: 1;
  min-width: 256px;
}
</style>
