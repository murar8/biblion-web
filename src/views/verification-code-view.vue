<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const authStore = useAuthStore();

const verificationError = ref<any | undefined>();
const isLoading = ref(false);
const isSent = ref(false);

const onVerify = async () => {
  try {
    isLoading.value = true;
    verificationError.value = undefined;

    await authStore.requestEmailVerification();

    isSent.value = true;
  } catch (error) {
    verificationError.value = error;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <n-space vertical align="center" justify="center" style="flex: 1">
    <n-h4 size="large">Send an email to {{ authStore.user!.email }} to confirm you are the owner of the address.</n-h4>

    <n-button
      size="large"
      :type="verificationError ? 'error' : isSent ? 'success' : 'primary'"
      :loading="isLoading"
      @click="onVerify"
    >
      <template #icon>
        <n-icon><fa-user-astronaut /></n-icon>
      </template>
      <template #default>
        {{ isSent ? "Request Another Code" : "Request Verication Code" }}
      </template>
    </n-button>

    <n-collapse-transition :show="isSent">
      <n-form-item>
        <n-text type="success"> Verification code sent. Check you inbox 🚀 </n-text>
      </n-form-item>
    </n-collapse-transition>

    <n-collapse-transition :show="Boolean(verificationError)">
      <n-form-item>
        <n-text type="error"> Error: {{ verificationError?.message || verificationError }} </n-text>
      </n-form-item>
    </n-collapse-transition>
  </n-space>
</template>
