<script setup lang="ts">
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { StatusCodes } from "http-status-codes";
import type { FormInst, FormRules } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usersApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import type { LoginUserRequest } from "@/generated";
import queryKeys from "@/query-keys";
import isEmail from "@/utils/is-email";

const router = useRouter();
const queryClient = useQueryClient();

const {
  mutateAsync: login,
  isLoading,
  error,
} = useMutation({
  mutationFn: async (loginUserRequest: LoginUserRequest) => usersApi.loginUser({ loginUserRequest }),
  onSuccess: (user) => queryClient.setQueryData(queryKeys.users.me.queryKey, user),
});

const errorMessage = useErrorMessage(error, {
  [StatusCodes.NOT_FOUND]: "User not found.",
  [StatusCodes.UNAUTHORIZED]: "Invalid password.",
});

interface FormData {
  identifier: string;
  password: string;
}

const rules: FormRules = {
  identifier: { trigger: ["blur"], required: true },
  password: { trigger: ["blur"], required: true },
};

const formData = ref<FormData>({ identifier: "", password: "" });
const formRef = ref<FormInst | undefined>();

const onSubmit = async () => {
  try {
    await formRef.value!.validate();
  } catch {
    return;
  }

  const identifier = isEmail(formData.value.identifier) ? "email" : "name";

  await login({
    [identifier]: formData.value.identifier,
    password: formData.value.password,
  });

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
    <n-form
      ref="formRef"
      :model="formData"
      size="large"
      :rules="rules"
      :validate-messages="{ required: 'Required.' }"
      @submit.prevent="onSubmit"
    >
      <n-h1>Login</n-h1>

      <n-form-item path="identifier" label="Username or Email">
        <n-input v-model:value="formData.identifier" type="text" />
      </n-form-item>

      <n-form-item path="password" label="Password">
        <n-input v-model:value="formData.password" type="password" show-password-on="click" />
      </n-form-item>

      <v-error-collapse :error-message="errorMessage" />

      <n-form-item>
        <n-space style="width: 100%" :wrap-item="false">
          <n-button :loading="isLoading" :type="error ? 'error' : 'primary'" style="flex: 1" attr-type="submit">
            <template #icon>
              <n-icon>
                <fa-exclamation-circle v-if="error" />
                <fa-user v-else />
              </n-icon>
            </template>

            <template #default> Login </template>
          </n-button>

          <n-button style="flex: 1" @click="router.push({ name: 'register' })">
            <template #icon>
              <n-icon>
                <fa-user-plus />
              </n-icon>
            </template>

            <template #default> Register </template>
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </n-space>
</template>
