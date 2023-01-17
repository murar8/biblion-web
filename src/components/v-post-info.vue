<script setup lang="ts">
import { NSpace, NTag } from "naive-ui";
import type { UserResponse } from "@/generated/api";
import languageNames from "@/language-names";
import type { LanguageSupportMode } from "@/language-support";

const props = defineProps<{
  creator?: UserResponse;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
}>();
</script>

<template>
  <n-space vertical size="small">
    <n-space v-if="props.creator" justify="space-between">
      Creator:
      <n-tag size="small" type="success">{{ props.creator.name || props.creator.email }}</n-tag>
    </n-space>

    <n-space v-if="props.language" justify="space-between">
      Language:
      <n-tag size="small" type="success">{{ languageNames[props.language as LanguageSupportMode] }}</n-tag>
    </n-space>

    <n-space justify="space-between">
      Created:
      <n-tag size="small" type="info">{{ props.createdAt.toLocaleDateString() }}</n-tag>
    </n-space>

    <n-space v-if="props.createdAt.getTime() !== props.updatedAt.getTime()" justify="space-between">
      Updated:
      <n-tag size="small" type="info">
        {{ props.updatedAt.toLocaleDateString() }}
      </n-tag>
    </n-space>
  </n-space>
</template>
