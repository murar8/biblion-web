<script lang="ts">
export default {
  async beforeRouteEnter(to, from, next) {
    // const postStore = usePostStore();
    // TODO
    // try {
    //   if (to.name === "post") await postStore.fetchPost(to.params.id as string);
    next();
    // } catch (error) {
    //   if (error instanceof ResponseError && error.response.status === 404) {
    //     next("/not-found");
    //   } else {
    //     throw error;
    //   }
    // }
  },
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

// const postStore = usePostStore();
const route = useRoute();
const isEditing = ref(route.name === "new-post");

const savePost = async () => {
  // await postStore.savePost();
  // isEditing.value = false;
};
</script>

<template>
  <n-space vertical class="container" :wrap-item="false" size="large">
    <!-- <n-space :wrap-item="false" size="large">
      <n-input
        v-model:value="postStore.post.name"
        :readonly="!isEditing"
        type="text"
        placeholder="Name"
        class="name-input"
      />

      <n-select
        v-if="isEditing"
        v-model:value="postStore.post.language"
        clearable
        filterable
        placeholder="Language"
        class="language-select"
        :options="[]"
      />
      <n-tag v-else-if="postStore.post.language" size="large" round>
        {{ postStore.post.language }}
      </n-tag>
    </n-space>

    <v-editor v-model="postStore.post.content" :readonly="!isEditing" style="flex: 1" placeholder="Content" /> -->

    <v-scale-fade-transition>
      <n-button v-if="isEditing" round type="primary" @click="savePost()">
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
  margin: 16px;
}

.name-input {
  flex: 10000;
  min-width: 128px;
}

.language-select {
  flex: 1;
  min-width: 192px;
}
</style>
