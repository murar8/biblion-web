<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui";
import { storeToRefs } from "pinia";
import { useColorModeStore } from "./stores/color-mode";

const { colorMode } = storeToRefs(useColorModeStore());
</script>

<template>
  <n-config-provider :theme="colorMode === 'dark' ? darkTheme : lightTheme">
    <n-global-style />
    <app-loading-bar />
    <header>
      <app-header />
    </header>
    <main>
      <router-view />
    </main>
  </n-config-provider>
</template>
