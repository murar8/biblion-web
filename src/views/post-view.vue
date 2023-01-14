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
import { useMutation, useQuery } from "@tanstack/vue-query";
import { NButton, NIcon, NInput, NSelect, NSpace, NTag, type SelectOption } from "naive-ui";
import { computed, reactive, ref, type Ref } from "vue";
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

const isEditing = ref(route.name === "new-post");
const post = reactive<PostResponse | CreatePostRequest>((route.meta.post as PostResponse) || { content: "" });
const creatorId = computed(() => ("creatorId" in post ? post.creatorId : undefined));
const isExisting = computed(() => !!creatorId.value);

const { data: user } = useQuery(queryKeys.users.me);

const { data: creator } = useQuery({
  ...queryKeys.users.detail(creatorId as Ref<string>),
  enabled: isExisting,
});

const {
  mutate: savePost,
  isLoading: isSaving,
  error: saveError,
} = useMutation({
  mutationFn: async () => {
    return "id" in post
      ? postsApi.updatePost({ postId: post.id, createPostRequest: post })
      : postsApi.createPost({ createPostRequest: post });
  },
  onSuccess: (data) => {
    queryClient.setQueryData(queryKeys.posts.detail(data.id).queryKey, data);
    Object.assign(post, data);
    isEditing.value = false;
    router.push({ name: "post", params: { id: data.id }, replace: true });
  },
});

const {
  mutate: deletePost,
  isLoading: isDeleting,
  error: deleteError,
} = useMutation({
  mutationFn: async () => {
    await postsApi.deletePost({ postId: (post as PostResponse).id });
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
    <n-space v-if="isEditing || post.name || post.language" :wrap-item="false" size="large">
      <n-input v-if="isEditing" v-model:value="post.name" type="text" placeholder="Name" class="name-input" />
      <n-h2 v-else class="name">{{ post.name }}</n-h2>

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

    <div class="editor-wrapper">
      <v-editor
        v-model="post.content"
        :language="(post.language as LanguageSupportMode)"
        :readonly="!isEditing"
        placeholder="Content"
        style="flex: 1"
      />

      <n-space v-if="'id' in post && !isEditing" vertical size="small" class="info">
        <n-space v-if="creator" justify="space-between">
          Creator:
          <n-tag size="small" type="success">{{ creator.name || creator.email }}</n-tag>
        </n-space>

        <n-space justify="space-between">
          Created:
          <n-tag size="small" type="info">{{ post.createdAt.toLocaleDateString() }}</n-tag>
        </n-space>

        <n-space v-if="post.createdAt.getTime() !== post.updatedAt.getTime()" justify="space-between">
          Updated:
          <n-tag size="small" type="info">
            {{ post.updatedAt.toLocaleDateString() }}
          </n-tag>
        </n-space>
      </n-space>
    </div>

    <v-error-collapse :error-message="errorMessage" />

    <n-space v-if="!('creatorId' in post) || post.creatorId === user?.id" justify="space-evenly" item-style="flex: 1">
      <v-scale-fade-transition>
        <n-button
          v-if="isEditing"
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

        <n-button v-else round type="primary" style="width: 100%" @click="isEditing = true">
          <template #icon>
            <n-icon><fa-edit /></n-icon>
          </template>

          <template #default> Edit </template>
        </n-button>
      </v-scale-fade-transition>

      <n-button v-if="'id' in post" :loading="isDeleting" round type="error" style="width: 100%" @click="deletePost()">
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

.name {
  flex: 10000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-basis: content;
}

.name-input {
  flex: 10000;
  min-width: 128px;
}

.language-select {
  flex: 1;
  min-width: 256px;
}

.editor-wrapper {
  flex: 1;
  display: flex;
  position: relative;
}

.info {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 16px;
  opacity: 0.8;
  transition: opacity 0.25s ease-in-out;
  text-align: right;
}

.info:hover {
  opacity: 0.2;
}
</style>
