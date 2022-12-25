<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import queryKeys from "@/query-keys";

const { data: user } = useQuery(queryKeys.users.me);
</script>

<template>
  <n-space vertical align="stretch" justify="center">
    <n-h1>User Settings</n-h1>

    <n-divider title-placement="center"> Account Info </n-divider>
    <update-user-view />

    <n-divider title-placement="center"> Email Verification </n-divider>
    <request-email-verification-view v-if="!user!.verified" />
    <n-h4 v-else>
      <n-icon color="green" style="margin-right: 6px; display: inline-block"><fa-lock-open /></n-icon>
      Your email address <n-tag>{{ user!.email }}</n-tag> is verified!
    </n-h4>

    <n-divider title-placement="center"> Password Reset </n-divider>
    <request-password-reset-view />
  </n-space>
</template>
