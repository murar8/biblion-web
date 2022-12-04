<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <n-space vertical align="center" justify="center" style="flex: 1">
    <n-result status="404" size="large" title="404 Not Found" description="You know life is always ridiculous.">
      <template #footer>
        <n-button @click="router.push('/')">Go Back Home</n-button>
      </template>
    </n-result>
  </n-space>
</template>
