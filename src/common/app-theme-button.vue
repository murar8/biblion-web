<script setup lang="ts">
import { isDark, toggleDark } from "@/composables/dark";
</script>

<template>
  <n-button circle @click="toggleDark()">
    <template #icon>
      <n-icon>
        <fa-sun v-if="isDark" />
        <fa-moon v-else />
      </n-icon>
    </template>
  </n-button>
</template>
