<script setup lang="ts">
import { useTitle } from "@vueuse/core";

const title = useTitle(undefined, { observe: true });
</script>

<template>
  <n-page-header justify="space-between" style="padding: 16px">
    <template #avatar>
      <router-link :to="{ name: 'home' }">
        <n-avatar src="/logo-32.png" />
      </router-link>
    </template>

    <template #title>
      {{ title }}
    </template>

    <template #extra>
      <n-space :wrap="false">
        <app-theme-button />
        <app-user-button />
      </n-space>
    </template>
  </n-page-header>

  <n-divider style="margin: 0" />
</template>
