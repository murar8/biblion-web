<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { usersApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import queryKeys from "@/query-keys";

const { data: user } = useQuery(queryKeys.users.me);

const {
  mutateAsync: requestPasswordReset,
  error,
  isLoading,
  isSuccess,
} = useMutation({
  mutationFn: async () => {
    await usersApi.requestPasswordReset();
  },
});

const errorMessage = useErrorMessage(error);
</script>

<template>
  <n-space vertical align="stretch" justify="center" style="flex: 1">
    <n-h4 size="large" style="text-align: center">
      You will receive an email to <n-tag>{{ user!.email }}</n-tag> containing the password reset link.
    </n-h4>

    <n-button
      size="large"
      :type="error ? 'error' : isSuccess ? 'success' : 'primary'"
      :loading="isLoading"
      style="width: 100%"
      @click="() => requestPasswordReset()"
    >
      <template #icon>
        <n-icon><fa-mail-bulk /></n-icon>
      </template>
      <template #default>
        {{ isSuccess ? "Request Another Code" : "Request Reset Code" }}
      </template>
    </n-button>

    <n-collapse-transition :show="isSuccess">
      <n-text type="success"> Reset code sent. Check your inbox 🚀 </n-text>
    </n-collapse-transition>

    <v-error-collapse :error-message="errorMessage" />
  </n-space>
</template>
