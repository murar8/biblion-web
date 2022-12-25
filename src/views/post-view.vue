<script lang="ts">
export default {
  async beforeRouteEnter(to, from, next) {
    try {
      if (to.name === "post") {
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
import { NButton, NIcon, NInput, NSelect, NSpace, NTag, type SelectOption } from "naive-ui";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { postsApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import { ResponseError, type CreatePostRequest, type PostResponse } from "@/generated";
import queryClient from "@/query-client";
import queryKeys from "@/query-keys";
import router from "@/router";
import languageNames from "@/language-names";
import type { LanguageSupportMode } from "@/language-support";

const languageOptions = computed<SelectOption[]>(() =>
  Object.entries(languageNames)
    .sort(([, a], [, b]) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map(([value, label]) => ({ value, label }))
);

const route = useRoute();

const isEditing = ref(route.name === "new-post");
const post = reactive<PostResponse | CreatePostRequest>((route.meta.post as PostResponse) || { content: "" });

const {
  mutate: savePost,
  isLoading,
  error,
} = useMutation({
  mutationFn: async () => {
    return "id" in post
      ? postsApi.updatePost({ postId: post.id, createPostRequest: post })
      : postsApi.createPost({ createPostRequest: post });
  },
  onSuccess: (data) => {
    queryClient.setQueryData(queryKeys.posts.detail(data.id).queryKey, data);
    Object.assign(post, data);
    router.push({ name: "post", params: { id: data.id }, replace: true });
  },
});

const errorMessage = useErrorMessage(error);
</script>

<template>
  <n-space vertical class="container" :wrap-item="false" size="large">
    <n-space :wrap-item="false" size="large">
      <n-input v-model:value="post.name" :readonly="!isEditing" type="text" placeholder="Name" class="name-input" />

      <n-select
        v-if="isEditing"
        v-model:value="post.language"
        clearable
        filterable
        placeholder="Language"
        class="language-select"
        :options="languageOptions"
      />

      <n-tag v-else-if="post.language" size="large">
        {{ languageNames[post.language as LanguageSupportMode] || post.language }}
      </n-tag>
    </n-space>

    <v-editor
      v-model="post.content"
      :language="post.language"
      :readonly="!isEditing"
      placeholder="Content"
      style="flex: 1"
    />

    <v-error-collapse :error-message="errorMessage" />

    <v-scale-fade-transition>
      <n-button
        v-if="isEditing"
        :disabled="!post.content"
        round
        :loading="isLoading"
        :type="error ? 'error' : 'primary'"
        @click="savePost()"
      >
        <template #icon>
          <n-icon><fa-save /></n-icon>
        </template>
        Save
      </n-button>

      <n-button v-else round type="primary" @click="isEditing = true">
        <template #icon>
          <n-icon><fa-edit /></n-icon>
        </template>
        Edit
      </n-button>
    </v-scale-fade-transition>
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
