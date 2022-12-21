<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { FormInst, FormRules } from "naive-ui";
import { computed, ref } from "vue";
import { usersApi } from "@/api";
import useErrorMessage from "@/composables/use-error-message";
import type { UpdateUserRequest } from "@/generated";
import queryKeys from "@/query-keys";
import { validateEmail, validateUsername } from "@/validators";

const queryClient = useQueryClient();

const { data: user } = useQuery(queryKeys.users.me);

const {
  mutateAsync: updateUser,
  isLoading: isUpdating,
  error: updateError,
} = useMutation({
  mutationFn: async (updateUserRequest: UpdateUserRequest) => {
    return usersApi.updateUser({ updateUserRequest, userId: user.value!.id });
  },
  onSuccess: (user) => {
    queryClient.setQueryData(queryKeys.users.me.queryKey, user);
  },
});

const {
  mutateAsync: requestPasswordReset,
  error: resetError,
  isLoading: isRequestingReset,
  isSuccess: isResetRequested,
} = useMutation({
  mutationFn: async () => {
    await usersApi.requestPasswordReset();
  },
});

const error = computed(() => updateError.value || resetError.value);
const errorMessage = useErrorMessage(error);

interface FormData {
  email: string;
  name: string | undefined;
}

const rules: FormRules = {
  email: {
    trigger: ["blur"],
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
};

const formData = ref<FormData>({ email: user.value!.email, name: user.value!.name });
const formRef = ref<FormInst | undefined>();

const payload = computed(() => {
  const payload: UpdateUserRequest = {};

  if ((formData.value.name || "") !== (user.value!.name || "")) payload.name = formData.value.name || "";
  if (formData.value.email !== user.value!.email) payload.email = formData.value.email;

  return Object.keys(payload).length > 0 ? payload : null;
});

const onSubmit = async (event: MouseEvent) => {
  event.preventDefault();

  try {
    await formRef.value!.validate();
  } catch {
    return;
  }

  await updateUser(payload.value!);
};
</script>

<template>
  <n-space vertical align="stretch" justify="center">
    <n-h1>User Settings</n-h1>

    <n-divider title-placement="center"> Account Info </n-divider>

    <n-form ref="formRef" :model="formData" size="large" :rules="rules">
      <n-form-item path="email" label="Email">
        <n-input v-model:value="formData.email" type="text" @keydown.enter.prevent />
      </n-form-item>

      <n-form-item path="name" label="Username">
        <n-input v-model:value="formData.name" type="text" clearable @keydown.enter.prevent />
      </n-form-item>

      <n-form-item>
        <n-space style="width: 100%" :wrap-item="false">
          <n-button
            :loading="isUpdating"
            :type="updateError ? 'error' : 'primary'"
            :disabled="!payload"
            style="flex: 1"
            @click="onSubmit"
          >
            <template #icon>
              <n-icon>
                <fa-exclamation-circle v-if="updateError" />
                <fa-user-plus v-else />
              </n-icon>
            </template>

            <template #default> Update </template>
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>

    <n-divider title-placement="center"> Password Reset </n-divider>

    <n-space vertical align="stretch" justify="center" style="flex: 1, width: 100%">
      <n-h4 size="large" style="text-align: center">
        You will receive an email to <n-tag>{{ user!.email }}</n-tag> containing the password reset link.
      </n-h4>

      <n-button
        size="large"
        :type="resetError ? 'error' : isResetRequested ? 'success' : 'primary'"
        :loading="isRequestingReset"
        style="width: 100%"
        @click="requestPasswordReset"
      >
        <template #icon>
          <n-icon><fa-user-secret /></n-icon>
        </template>
        <template #default>
          {{ isResetRequested ? "Request Another Code" : "Request Reset Code" }}
        </template>
      </n-button>

      <n-collapse-transition :show="isResetRequested">
        <n-form-item>
          <n-text type="success"> Reset code sent. Check your inbox 🚀 </n-text>
        </n-form-item>
      </n-collapse-transition>
    </n-space>

    <v-error-collapse :error-message="errorMessage" />
  </n-space>
</template>
