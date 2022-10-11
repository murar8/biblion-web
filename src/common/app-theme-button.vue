<script setup lang="ts">
import { useColorModeStore } from "@/stores/color-mode";
const store = useColorModeStore();
</script>

<template>
  <n-button circle @click="store.toggleColorMode()">
    <template #icon>
      <n-icon v-if="store.colorMode === 'dark'"><fa-sun /> </n-icon>
      <n-icon v-else> <fa-moon /> </n-icon>
    </template>
  </n-button>
</template>
