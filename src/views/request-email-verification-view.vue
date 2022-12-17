<script setup lang="ts">
import { usersApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import queryKeys from "@/query-keys";
import { useMutation, useQuery } from "@tanstack/vue-query";

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
    <n-h4 size="large">Send an email to {{ user!.email }} to confirm you are the owner of the address.</n-h4>

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
      <n-form-item>
        <n-text type="success"> Verification code sent. Check your inbox 🚀 </n-text>
      </n-form-item>
    </n-collapse-transition>

    <n-collapse-transition :show="Boolean(error)">
      <n-form-item>
        <n-text type="error"> Error: {{ errorMessage }} </n-text>
      </n-form-item>
    </n-collapse-transition>
  </n-space>
</template>
