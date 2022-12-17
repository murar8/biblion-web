<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui";
import { isDark } from "@/composables/dark";
</script>

<template>
  <n-config-provider abstract :theme="isDark ? darkTheme : lightTheme">
    <n-global-style />
    <n-message-provider>
      <n-loading-bar-provider>
        <app-loading-bar />
        <header>
          <app-header />
        </header>
        <main id="content">
          <router-view />
        </main>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<!-- Global styles are configured here. -->

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
