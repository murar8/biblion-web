<script lang="ts">
export default {
  async beforeRouteEnter() {
    // TODO: fetch post
  },
};
</script>

<script setup lang="ts">
import { usePostStore } from "@/stores/post";

const postStore = usePostStore();
</script>

<template>
  <n-space vertical class="container" :wrap-item="false" size="large">
    <n-space :wrap-item="false" size="large">
      <n-input v-model:value="postStore.post.name" type="text" placeholder="Name" class="name-input" />

      <n-select
        v-model:value="postStore.post.language"
        clearable
        filterable
        placeholder="Language"
        class="language-select"
        :options="[]"
      />
    </n-space>

    <v-editor v-model="postStore.post.content" style="flex: 1" placeholder="Content" />

    <n-button-group>
      <n-button round type="primary" style="width: 50%">
        <template #icon>
          <n-icon><fa-save /></n-icon>
        </template>
        Save
      </n-button>
      <n-button round ghost style="width: 50%">
        <template #icon>
          <n-icon><fa-undo /></n-icon>
        </template>
        Cancel
      </n-button>
    </n-button-group>
  </n-space>
</template>

<style scoped>
.container {
  flex: 1;
  margin: 16px;
}

.name-input {
  flex: 10000;
  min-width: 256px;
}

.language-select {
  flex: 1;
  min-width: 256px;
  width: 100%;
}
</style>
