<!-- eslint-disable vue/one-component-per-file -->

<script lang="ts">
import { NAlert, useLoadingBar, useMessage, type MessageRenderMessage } from "naive-ui";
import { defineComponent, h } from "vue";
import { useRouter } from "vue-router";

const renderMessage: MessageRenderMessage = (props) => {
  return h(NAlert, { title: "An error occured", type: "error" }, { default: () => props.content });
};

export default {
  components: {
    LoadingBarContent: defineComponent({
      setup: () => {
        const loadingBar = useLoadingBar();
        const message = useMessage();
        const router = useRouter();

        router.beforeEach(() => {
          loadingBar.start();
        });

        router.afterEach(() => {
          loadingBar.finish();
        });

        router.onError((error) => {
          loadingBar.error();
          message.error(error?.message, { render: renderMessage });
        });

        return () => {};
      },
    }),
  },
};
</script>

<script setup lang="ts"></script>

<template>
  <n-message-provider>
    <n-loading-bar-provider>
      <loading-bar-content />
    </n-loading-bar-provider>
  </n-message-provider>
</template>
