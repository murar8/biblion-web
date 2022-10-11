<script setup lang="ts">
import { toggleThemeKey } from "@/keys";
import { inject } from "vue";

const toggleTheme = inject(toggleThemeKey)!;
</script>

<template>
  <n-button circle @click="toggleTheme()">
    <template #icon>
      <n-icon><fa-sun /></n-icon>
    </template>
  </n-button>
</template>
