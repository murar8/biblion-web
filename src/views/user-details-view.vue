<script lang="ts">
export default {
  async beforeRouteEnter(to, from, next) {
    try {
      if (to.params.id) {
        to.meta.user = await queryClient.ensureQueryData(queryKeys.users.detail(to.params.id as string));
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
import { useRoute, useRouter } from "vue-router";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/vue-query";
import { NSpace, NH2, NText, NGrid, NButton, NCard, NDivider, NGridItem, NIcon } from "naive-ui";
import { computed } from "vue";
import { ResponseError, type UserResponse } from "@/generated";
import queryClient from "@/query-client";
import queryKeys from "@/query-keys";
import { postsApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";

const PAGE_SIZE = 12;

const route = useRoute();
const router = useRouter();

const user = route.meta.user as UserResponse;

const { data: currentUser } = useQuery(queryKeys.users.me);

const isOwnProfile = computed(() => currentUser.value?.id === user.id);

const { queryFn, queryKey } = queryKeys.posts.list({ limit: PAGE_SIZE, creatorId: user.id });

const {
  data,
  error: fetchError,
  fetchNextPage,
  hasNextPage,
  isInitialLoading,
  isFetching,
  refetch,
} = useInfiniteQuery({
  queryKey,
  queryFn,
  getNextPageParam: (lastPage, pages) => (lastPage.hasMore ? pages.length + 1 : null),
});

const {
  mutate: deletePost,
  error: deleteError,
  variables,
  isLoading: isDeleting,
} = useMutation({
  mutationFn: async (postId: string) => {
    await postsApi.deletePost({ postId });
  },
  onSuccess: async () => {
    await refetch({ queryKey });
  },
});

const error = computed(() => fetchError.value || deleteError.value);
const errorMessage = useErrorMessage(error);
</script>

<template>
  <n-space style="padding: 16px; width: 100%; box-sizing: border-box" vertical>
    <n-h2 class="title">
      <template v-if="user.name">
        {{ user.name }} <n-text :depth="3">({{ user.email }})</n-text>
      </template>
      <template v-else>
        {{ user.email }}
      </template>
    </n-h2>

    <n-text :depth="3" style="text-align: center; display: block">{{ user.id }}</n-text>

    <n-divider />

    <n-result v-if="errorMessage" status="error" title="An error occured" :description="errorMessage" />

    <n-grid
      v-else-if="data?.pages?.[0]?.data?.length"
      item-responsive
      responsive="screen"
      :x-gap="8"
      :y-gap="8"
      cols="1 s:2 m:3 l:4 xl:6"
    >
      <template v-for="(group, index) in data.pages" :key="index">
        <n-grid-item v-for="post in group.data" :key="post.id">
          <n-card style="height: 100%">
            <template #header>
              <n-text :depth="post.name ? 1 : 3">{{ post.name || post.id }}</n-text>
            </template>

            <template v-if="post.name" #header-extra>
              <n-text :depth="3">{{ post.id }}</n-text>
            </template>

            <template #default>
              <v-post-info :language="post.language" :created-at="post.createdAt" :updated-at="post.updatedAt" />
            </template>

            <template #action>
              <n-space :wrap-item="false" class="action-wrapper">
                <n-button round type="primary" @click="router.push({ name: 'post', params: { id: post.id } })">
                  <template #icon>
                    <n-icon><fa-eye /></n-icon>
                  </template>

                  <template #default> View </template>
                </n-button>

                <n-button
                  v-if="isOwnProfile"
                  round
                  type="primary"
                  @click="router.push({ name: 'edit-post', params: { id: post.id } })"
                >
                  <template #icon>
                    <n-icon><fa-edit /></n-icon>
                  </template>

                  <template #default> Edit </template>
                </n-button>

                <n-button
                  v-if="isOwnProfile"
                  :loading="isDeleting && variables === post.id"
                  round
                  type="error"
                  @click="deletePost(post.id)"
                >
                  <template #icon>
                    <n-icon><fa-trash /></n-icon>
                  </template>

                  <template #default> Delete </template>
                </n-button>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
      </template>
    </n-grid>

    <n-h3 v-else style="text-align: center">No items found.</n-h3>

    <n-spin v-if="isInitialLoading" size="large" style="margin: auto; width: 100%" />

    <n-button v-if="hasNextPage" style="width: 100%" secondary :loading="isFetching" @click="fetchNextPage()">
      Load More
    </n-button>
  </n-space>
</template>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 0;
}

.action-wrapper > * {
  flex: 1;
}
</style>
