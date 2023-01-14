<script setup lang="ts">
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { StatusCodes } from "http-status-codes";
import type { FormInst, FormRules } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usersApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import type { CreateUserRequest } from "@/generated";
import queryKeys from "@/query-keys";
import { validateEmail, validatePassword, validateUsername } from "@/validators";

const router = useRouter();
const queryClient = useQueryClient();

const {
  mutateAsync: register,
  isLoading,
  error,
} = useMutation({
  mutationFn: async (createUserRequest: CreateUserRequest) => {
    await usersApi.createUser({ createUserRequest });
    return usersApi.loginUser({ loginUserRequest: createUserRequest });
  },
  onSuccess: (user) => {
    queryClient.setQueryData(queryKeys.users.me.queryKey, user);
  },
});

const errorMessage = useErrorMessage(error, { [StatusCodes.CONFLICT]: "User already exists." });

interface FormData {
  email: string;
  name: string;
  password: string;
}

const rules: FormRules = {
  email: {
    trigger: ["blur"],
    required: true,
    asyncValidator: async (rule, value: string) => {
      await validateEmail(value);
    },
  },
  name: {
    trigger: ["blur"],
    asyncValidator: async (rule, value: string) => {
      if (value) await validateUsername(value);
    },
  },
  password: {
    trigger: ["blur"],
    required: true,
    asyncValidator: async (rule, value: string) => {
      await validatePassword(value);
    },
  },
};

const formData = ref<FormData>({ email: "", name: "", password: "" });
const formRef = ref<FormInst | undefined>();

const onSubmit = async () => {
  try {
    await formRef.value!.validate();
  } catch {
    return;
  }

  await register({
    name: formData.value.name || undefined,
    email: formData.value.email,
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
    <n-form ref="formRef" :model="formData" size="large" :rules="rules" @submit.prevent="onSubmit">
      <n-h1>Create an Account</n-h1>

      <n-form-item path="email" label="Email">
        <n-input v-model:value="formData.email" type="text" />
      </n-form-item>

      <n-form-item path="name" label="Username">
        <n-input v-model:value="formData.name" type="text" clearable />
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
                <fa-user-plus v-else />
              </n-icon>
            </template>

            <template #default> Register </template>
          </n-button>

          <n-button style="flex: 1" @click="router.push({ name: 'login' })">
            <template #icon>
              <n-icon>
                <fa-user />
              </n-icon>
            </template>

            <template #default> Login </template>
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </n-space>
</template>
