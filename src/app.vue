<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui";
import { storeToRefs } from "pinia";
import { useColorModeStore } from "./stores/color-mode";

const { colorMode } = storeToRefs(useColorModeStore());
</script>

<template>
  <n-config-provider :theme="colorMode === 'dark' ? darkTheme : lightTheme">
    <n-global-style />
    <n-message-provider>
      <n-loading-bar-provider>
        <app-loading-bar />
        <header>
          <app-header />
        </header>
        <main>
          <router-view />
        </main>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>
