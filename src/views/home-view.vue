<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useElementSize, useMouse } from "@vueuse/core";
import { useThemeVars } from "naive-ui";
import { ref, watchPostEffect } from "vue";
import { useRouter } from "vue-router";
import queryKeys from "@/query-keys";

const { data: user } = useQuery(queryKeys.users.me);
const router = useRouter();
const theme = useThemeVars();

const canvasRef = ref<HTMLCanvasElement>();
const { width: canvasWidth, height: canvasHeight } = useElementSize(canvasRef);
const { x: mouseX, y: mouseY } = useMouse();

watchPostEffect((onCleanup) => {
  const canvas = canvasRef.value!;

  const width = canvasWidth.value;
  const height = canvasHeight.value;

  const centerX = mouseX.value;
  const centerY = mouseY.value;

  const primaryColor = theme.value.primaryColor;
  const borderColor = theme.value.actionColor;

  const requestId = requestAnimationFrame(() => {
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;

    // Draw using a gradient color centered on the current mouse position.
    const sideLength = Math.min(width, height) / 2;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sideLength);
    gradient.addColorStop(0, primaryColor);
    gradient.addColorStop(1, borderColor);
    ctx.strokeStyle = gradient;

    const angle = (2 * Math.PI) / 6;
    const multiplier = width < 640 ? 6 : width < 1280 ? 12 : 24; // Must be a multiple of 6.
    const outerRadius = width / multiplier; // Make the grid always symmetric.
    const innerRadius = outerRadius * Math.sin(angle);

    // Note: for the grid to display correctly there must be no overlap between the lines.
    for (let y = -innerRadius / 2; y < height + innerRadius; y += innerRadius * 2) {
      for (let x = 0; x < width + outerRadius; x += outerRadius * 3) {
        ctx.beginPath();

        for (let i = 2; i < 8; i++) {
          const px = x + outerRadius * Math.cos(angle * i);
          const py = y + outerRadius * Math.sin(angle * i);
          ctx.lineTo(px, py);
        }

        ctx.stroke();

        ctx.beginPath();

        const py = y + outerRadius * Math.sin(angle * 6);
        const px = x + outerRadius * Math.cos(angle * 6);
        ctx.lineTo(px, py);
        ctx.lineTo(px + outerRadius, py);

        ctx.stroke();
      }
    }
  });

  onCleanup(() => {
    cancelAnimationFrame(requestId);
  });
});
</script>

<template>
  <n-space vertical align="center" justify="center" class="container">
    <canvas ref="canvasRef" class="background" />

    <n-space vertical align="center" justify="center" style="margin: 16px">
      <n-h1>Welcome to Biblion</n-h1>

      <n-h4> Biblion is a tool created to upload files and share them with ease.</n-h4>

      <n-button v-if="user" type="primary" style="width: 100%" @click="router.push({ name: 'edit-post' })">
        <template #icon>
          <n-icon>
            <fa-sticky-note />
          </n-icon>
        </template>

        <template #default> Create a Post </template>
      </n-button>

      <n-button v-else type="primary" style="width: 100%" @click="router.push({ name: 'register' })">
        <template #icon>
          <n-icon>
            <fa-user />
          </n-icon>
        </template>

        <template #default> Create an Account </template>
      </n-button>
    </n-space>
  </n-space>
</template>

<style scoped>
.container {
  flex: 1;
  width: 100%;
  position: relative;
  text-align: center;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}
</style>
