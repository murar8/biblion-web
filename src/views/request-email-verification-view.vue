<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { usersApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import queryKeys from "@/query-keys";

const { data: user } = useQuery(queryKeys.users.me);

const {
  mutateAsync: requestEmailVerification,
  error,
  isLoading,
  isSuccess,
} = useMutation({
  mutationFn: async () => {
    await usersApi.requestEmailVerification();
  },
});

const errorMessage = useErrorMessage(error);
</script>

<template>
  <n-space vertical align="center" justify="center" style="flex: 1">
    <n-h4 size="large">
      Send an email to <n-tag>{{ user!.email }}</n-tag> to confirm you are the owner of the address.
    </n-h4>

    <n-button
      size="large"
      :type="error ? 'error' : isSuccess ? 'success' : 'primary'"
      :loading="isLoading"
      @click="requestEmailVerification"
    >
      <template #icon>
        <n-icon><fa-mail-bulk /></n-icon>
      </template>
      <template #default>
        {{ isSuccess ? "Request Another Code" : "Request Verication Code" }}
      </template>
    </n-button>

    <n-collapse-transition :show="isSuccess">
      <n-text type="success"> Verification code sent. Check your inbox 🚀 </n-text>
    </n-collapse-transition>

    <v-error-collapse :error-message="errorMessage" />
  </n-space>
</template>
