<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import type { PopoverInst } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const logoutError = ref<any | undefined>();
const isLoggingOut = ref(false);

const popoverRef = ref<PopoverInst | undefined>();

const onTriggerClick = () => {
  if (!authStore.user) router.push({ name: "login" });
};

const onLogout = async () => {
  try {
    isLoggingOut.value = true;
    logoutError.value = undefined;

    await authStore.logout();
    popoverRef.value?.setShow(false);
    await router.push({ name: "home" });
  } catch (error) {
    logoutError.value = error;
  } finally {
    isLoggingOut.value = false;
  }
};
</script>

<template>
  <n-popover
    ref="popoverRef"
    content-style="padding: 8px; display: flex; justify-content: center;"
    footer-style="padding: 0; display: flex; justify-content: center;"
    trigger="click"
    :disabled="!authStore.user"
  >
    <template #trigger>
      <n-button circle :loading="authStore.isLoading" @click="onTriggerClick">
        <template #icon>
          <n-icon><fa-user /></n-icon>
        </template>
      </n-button>
    </template>

    <template v-if="authStore.user" #default>
      <n-text
        type="info"
        size="large"
        style="display: inline-block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 256px"
      >
        {{ authStore.user!.name || authStore.user!.email }}
      </n-text>
    </template>

    <template v-if="authStore.user" #footer>
      <n-space vertical :size="0">
        <n-button
          v-if="!authStore.user!.verified"
          text
          style="padding: 8px"
          type="warning"
          @click="router.push({ name: 'verify' })"
        >
          <template #icon>
            <n-icon><fa-user-astronaut /></n-icon>
          </template>
          <template #default> Verify your Account </template>
        </n-button>

        <n-button
          text
          style="padding: 8px"
          :loading="isLoggingOut"
          :type="logoutError ? 'error' : 'tertiary'"
          @click="onLogout"
        >
          <template #icon>
            <n-icon><fa-user-slash /></n-icon>
          </template>
          <template #default> Log Out </template>
        </n-button>
      </n-space>
    </template>
  </n-popover>
</template>
