<script setup lang="ts">
import { isDark, toggleDark } from "@/composables/dark";
</script>

<template>
  <n-button circle @click="toggleDark()">
    <template #icon>
      <n-icon v-if="isDark"><fa-sun /> </n-icon>
      <n-icon v-else> <fa-moon /> </n-icon>
    </template>
  </n-button>
</template>
