<!-- eslint-disable vue/one-component-per-file -->

<script lang="ts">
import { useLoadingBar } from "naive-ui";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    LoadingBar: defineComponent({
      setup: () => {
        const loadingBar = useLoadingBar();
        const router = useRouter();

        router.beforeEach(() => {
          loadingBar.start();
        });

        router.afterEach(() => {
          loadingBar.finish();
        });

        router.onError(() => {
          loadingBar.error();
        });

        return () => {};
      },
    }),
  },
};
</script>

<script setup lang="ts"></script>

<template>
  <n-loading-bar-provider>
    <loading-bar />
  </n-loading-bar-provider>
</template>
