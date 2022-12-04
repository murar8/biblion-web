<script setup lang="ts">
import { NAlert, useLoadingBar, useMessage, type MessageRenderMessage } from "naive-ui";
import { h } from "vue";
import { useRouter } from "vue-router";

const renderMessage: MessageRenderMessage = (props) => {
  return h(NAlert, { title: "An error occured", type: "error" }, { default: () => props.content });
};

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
</script>

<template>{{}}</template>
