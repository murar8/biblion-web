<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";

const { user, isAuthenticated, loginWithPopup, logout } = useAuth0();
</script>

<template>
  <n-popover
    trigger="click"
    :disabled="!isAuthenticated"
    content-style="height: 32px"
    footer-style="height: 32px; display: flex"
  >
    <template #trigger>
      <n-button circle @click="if (!isAuthenticated) loginWithPopup();">
        <template #icon>
          <n-icon><fa-user /></n-icon>
        </template>
      </n-button>
    </template>
    <template #default>
      <n-space align="center" size="small" :wrap="false">
        <n-image
          :src="user.picture"
          :img-props="{ 'referrer-policy': 'noreferrer' }"
          object-fit="contain"
          width="32"
          style="border-radius: 4px"
          preview-disabled
        />
        <n-text
          strong
          style="
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 128px;
          "
        >
          {{ user.name || user.email }}
        </n-text>
      </n-space>
    </template>
    <template #footer>
      <n-button block text style="padding: 8px" @click="logout()"> Log Out </n-button>
    </template>
  </n-popover>
</template>
