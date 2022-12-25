<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { StatusCodes } from "http-status-codes";
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

const updateErrorMessage = useErrorMessage(updateError, {
  [StatusCodes.CONFLICT]: "Username or email already exist.",
});

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
  <n-form ref="formRef" :model="formData" size="large" :rules="rules">
    <n-form-item path="email" label="Email">
      <n-input v-model:value="formData.email" type="text" @keydown.enter.prevent />
    </n-form-item>

    <n-form-item path="name" label="Username">
      <n-input v-model:value="formData.name" type="text" clearable @keydown.enter.prevent />
    </n-form-item>

    <v-error-collapse :error-message="updateErrorMessage" />

    <n-form-item>
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
    </n-form-item>
  </n-form>
</template>
