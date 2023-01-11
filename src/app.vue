<script setup lang="ts">
import { darkTheme, lightTheme, type GlobalThemeOverrides } from "naive-ui";
import { computed } from "vue";
import { isDark } from "@/composables/dark";

const themeOverrides = computed<GlobalThemeOverrides>(() => ({
  common: {
    primaryColor: isDark.value ? "#b39ddb" : "#512da8",
    primaryColorSuppl: isDark.value ? "#b39ddb" : "#512da8",
    primaryColorHover: isDark.value ? "#e6ceff" : "#8559da",
    primaryColorPressed: isDark.value ? "#836fa9" : "#140078",
  },
}));
</script>

<template>
  <n-config-provider abstract :theme="isDark ? darkTheme : lightTheme" :theme-overrides="themeOverrides">
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
