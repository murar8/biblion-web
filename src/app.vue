<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui";
import { provide, ref } from "vue";
import { toggleThemeKey } from "./keys";

const getTheme = () => {
  const userPreference = localStorage.getItem("theme") as "light" | "dark" | null;
  if (userPreference) return userPreference;
  if (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches) return "dark";
  else return "light";
};

const variant = ref(getTheme());

const toggleTheme = () => {
  const next = variant.value === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  variant.value = next;
};

provide(toggleThemeKey, toggleTheme);
</script>

<template>
  <n-config-provider :theme="variant === 'dark' ? darkTheme : lightTheme">
    <n-global-style />
    <header>
      <app-header />
    </header>
    <main>
      <router-view />
    </main>
  </n-config-provider>
</template>
