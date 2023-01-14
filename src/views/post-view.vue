<script lang="ts">
export default {
  async beforeRouteEnter(to, from, next) {
    try {
      to.meta.post = await queryClient.ensureQueryData(queryKeys.posts.detail(to.params.id as string));
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
import { NButton, NIcon, NSpace, NTag } from "naive-ui";
import { useRoute } from "vue-router";
import { postsApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import { ResponseError, type PostResponse } from "@/generated";
import languageNames from "@/language-names";
import type { LanguageSupportMode } from "@/language-support";
import queryClient from "@/query-client";
import queryKeys from "@/query-keys";
import router from "@/router";

const route = useRoute();

const post = route.meta.post as PostResponse;
const creatorId = "creatorId" in post ? post.creatorId : undefined;

const { data: user } = useQuery(queryKeys.users.me);

const { data: creator } = useQuery({
  ...queryKeys.users.detail(creatorId as string),
  enabled: !!creatorId,
});

const {
  mutate: deletePost,
  isLoading: isDeleting,
  error,
} = useMutation({
  mutationFn: async () => {
    await postsApi.deletePost({ postId: (post as PostResponse).id });
  },
  onSuccess: async () => {
    await router.push({ name: "home", replace: true });
  },
});

const errorMessage = useErrorMessage(error);
</script>

<template>
  <n-space vertical class="container" :wrap-item="false" size="large">
    <n-space v-if="post.name || post.language" :wrap-item="false">
      <n-h2 v-if="post.name" style="margin-bottom: 0" class="name">
        {{ post.name }}
      </n-h2>

      <n-tag v-if="post.language" size="large">
        {{ languageNames[post.language as LanguageSupportMode] || post.language }}
      </n-tag>
    </n-space>

    <div class="editor-wrapper">
      <v-editor
        v-model="post.content"
        :language="(post.language as LanguageSupportMode)"
        readonly
        placeholder="Content"
        style="flex: 1"
      />

      <n-collapse arrow-placement="right" display-directive="show" default-expanded-names="content" class="info">
        <n-collapse-item name="content">
          <template #header>
            <n-text style="text-align: end; width: 100%">Info</n-text>
          </template>

          <template #default>
            <n-space vertical size="small">
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
          </template>
        </n-collapse-item>
      </n-collapse>
    </div>

    <v-error-collapse :error-message="errorMessage" />

    <n-space v-if="post.creatorId === user?.id" justify="space-evenly" item-style="flex: 1">
      <n-button
        round
        type="primary"
        style="width: 100%"
        @click="router.push({ name: 'edit-post', params: { id: post.id } })"
      >
        <template #icon>
          <n-icon><fa-edit /></n-icon>
        </template>

        <template #default> Edit </template>
      </n-button>

      <n-button :loading="isDeleting" round type="error" style="width: 100%" @click="deletePost()">
        <template #icon>
          <n-icon>
            <fa-exclamation-circle v-if="error" />
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
  width: fit-content;
  transition: opacity 0.25s ease-in-out;
  text-align: right;
}
</style>
