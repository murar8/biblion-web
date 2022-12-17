<script setup lang="ts">
import { usersApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import queryKeys from "@/query-keys";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { StatusCodes } from "http-status-codes";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const queryClient = useQueryClient();

const { mutate: verifyEmail, error } = useMutation({
  mutationFn: async () => usersApi.verifyEmail({ code: route.params.code as string }),
  onSuccess: (data) => {
    queryClient.setQueryData(queryKeys.users.me.queryKey, data);
    router.push({ name: "home" });
  },
});

const errorMessage = useErrorMessage(error, {
  [StatusCodes.NOT_FOUND]: "Verification code not found.",
  [StatusCodes.GONE]: "Verification code expired.",
  [StatusCodes.UNAUTHORIZED]: "Verification code is invalid.",
});

onBeforeMount(verifyEmail);
</script>

<template>
  <n-space vertical align="center" justify="center" style="flex: 1">
    <n-spin v-if="!error" :size="64" />

    <n-space v-else vertical>
      <n-h3>
        <n-text type="error"> Error: {{ errorMessage }} </n-text>
      </n-h3>
    </n-space>
  </n-space>
</template>
