<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { PopoverInst } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";
import queryKeys from "@/query-keys";
import { usersApi } from "@/api";

const router = useRouter();
const queryClient = useQueryClient();

const { data: user, isLoading } = useQuery(queryKeys.users.me);

const {
  mutate: logout,
  isLoading: isLoggingOut,
  error: logoutError,
} = useMutation({
  mutationFn: async () => usersApi.logoutUser(),
  onSuccess: () => {
    queryClient.setQueryData(queryKeys.users.me.queryKey, null);
    router.push({ name: "home" });
  },
});

const popoverRef = ref<PopoverInst | undefined>();

const onTriggerClick = () => {
  if (!user.value) router.push({ name: "login" });
};
</script>

<template>
  <n-popover
    ref="popoverRef"
    content-style="padding: 8px; display: flex; justify-content: center;"
    footer-style="padding: 0; display: flex; justify-content: center;"
    trigger="hover"
    :disabled="!user"
  >
    <template #trigger>
      <n-button circle :loading="isLoading" @click="onTriggerClick()">
        <template #icon>
          <n-icon><fa-user /></n-icon>
        </template>
      </n-button>
    </template>

    <template v-if="user" #default>
      <n-text
        type="info"
        size="large"
        style="display: inline-block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 256px"
      >
        {{ user!.name || user!.email }}
      </n-text>
    </template>

    <template v-if="user" #footer>
      <n-space vertical :size="0">
        <n-button
          text
          style="padding: 8px"
          type="primary"
          @click="router.push({ name: 'user', params: { id: user!.id } })"
        >
          <template #icon>
            <n-icon><fa-user /></n-icon>
          </template>

          <template #default> Profile </template>
        </n-button>

        <n-button
          v-if="!user!.verified"
          text
          style="padding: 8px"
          type="warning"
          @click="router.push({ name: 'request-email-verification' })"
        >
          <template #icon>
            <n-icon><fa-mail-bulk /></n-icon>
          </template>

          <template #default> Verify your Account </template>
        </n-button>

        <n-button text style="padding: 8px" type="info" @click="router.push({ name: 'settings' })">
          <template #icon>
            <n-icon><fa-user-edit /></n-icon>
          </template>

          <template #default> Account Settings </template>
        </n-button>

        <n-button
          text
          style="padding: 8px"
          :loading="isLoggingOut"
          :type="logoutError ? 'error' : 'tertiary'"
          @click="logout()"
        >
          <template #icon>
            <n-icon>
              <fa-exclamation-circle v-if="logoutError" />
              <fa-sign-out-alt v-else />
            </n-icon>
          </template>

          <template #default> Log Out </template>
        </n-button>
      </n-space>
    </template>
  </n-popover>
</template>
