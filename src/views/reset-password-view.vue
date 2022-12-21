<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { StatusCodes } from "http-status-codes";
import type { FormInst, FormRules } from "naive-ui";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usersApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import type { ResetPasswordRequest } from "@/generated";
import queryKeys from "@/query-keys";
import { validatePassword } from "@/validators";

const router = useRouter();
const route = useRoute();

const queryClient = useQueryClient();

const { data: user } = useQuery(queryKeys.users.me);

const {
  mutateAsync: resetPassword,
  isLoading,
  error,
} = useMutation({
  mutationFn: async (resetPasswordRequest: ResetPasswordRequest) => {
    await usersApi.resetPassword({ resetPasswordRequest, code: route.params.code as string });
    return usersApi.loginUser({ loginUserRequest: { email: user.value!.email, ...resetPasswordRequest } });
  },
  onSuccess: (user) => {
    queryClient.setQueryData(queryKeys.users.me.queryKey, user);
  },
});

const errorMessage = useErrorMessage(error, {
  [StatusCodes.NOT_FOUND]: "Reset code not found.",
  [StatusCodes.GONE]: "Reset code expired.",
  [StatusCodes.UNAUTHORIZED]: "Reset code is invalid.",
});

interface FormData {
  password: string;
}

const rules: FormRules = {
  password: {
    trigger: ["blur"],
    required: true,
    asyncValidator: async (rule, value: string) => {
      await validatePassword(value);
    },
  },
};

const formData = ref<FormData>({ password: "" });
const formRef = ref<FormInst | undefined>();

const onSubmit = async (event: MouseEvent) => {
  event.preventDefault();

  try {
    await formRef.value!.validate();
  } catch {
    return;
  }

  await resetPassword({ password: formData.value.password });

  await router.push({ name: "home" });
};
</script>

<template>
  <n-space
    vertical
    align="stretch"
    justify="center"
    style="flex: 1; box-sizing: border-box; padding: 16px; width: min(384px, 100%)"
  >
    <n-form ref="formRef" :model="formData" size="large" :rules="rules">
      <n-h1>Reset your Password</n-h1>

      <n-form-item path="password" label="New Password">
        <n-input v-model:value="formData.password" type="password" show-password-on="click" @keydown.enter.prevent />
      </n-form-item>

      <v-error-collapse :error-message="errorMessage" />

      <n-form-item>
        <n-space style="width: 100%" :wrap-item="false">
          <n-button :loading="isLoading" :type="error ? 'error' : 'primary'" style="flex: 1" @click="onSubmit">
            <template #icon>
              <n-icon>
                <fa-exclamation-circle v-if="error" />
                <fa-user-secret v-else />
              </n-icon>
            </template>

            <template #default> Reset </template>
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </n-space>
</template>
