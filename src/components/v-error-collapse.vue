<script setup lang="ts">
const props = defineProps<{ errorMessage?: string | null }>();
</script>

<template>
  <n-collapse-transition :show="Boolean(props.errorMessage)">
    <n-space style="padding-block: 16px">
      <n-text type="error">
        Error: <n-text code>{{ errorMessage }}</n-text>
      </n-text>
    </n-space>
  </n-collapse-transition>
</template>
