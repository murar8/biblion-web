<script setup lang="ts">
import { toggleThemeKey } from "@/keys";
import { inject } from "vue";

const toggleTheme = inject(toggleThemeKey)!;
</script>

<template>
  <n-page-header justify="space-between" style="padding: 16px">
    <template #avatar>
      <n-avatar src="logo-32.png" />
    </template>
    <template #title> Biblion </template>
    <template #extra>
      <n-space>
        <n-button circle @click="toggleTheme()">
          <template #icon>
            <n-icon><fa-sun /></n-icon>
          </template>
        </n-button>
      </n-space>
    </template>
  </n-page-header>
</template>
