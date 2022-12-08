<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { validateEmail, validatePassword, validateUsername } from "@/validators";
import type { FormInst, FormRules } from "naive-ui";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const error = ref<any | null>(null);
const isLoading = ref(false);

const errorMessage = computed(() => {
  switch (error.value?.response?.status) {
    case 409:
      return "User already exists.";
    default:
      return error.value?.message || "Unknown error.";
  }
});

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
const formRef = ref<FormInst | null>(null);

const onSubmit = async (event: MouseEvent) => {
  event.preventDefault();

  try {
    await formRef.value!.validate();
  } catch {
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;

    await authStore.register({
      name: formData.value.name || undefined,
      email: formData.value.email,
      password: formData.value.password,
    });

    await router.push({ name: "home" });
  } catch (exception) {
    error.value = exception;
  } finally {
    isLoading.value = false;
  }
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
      <n-h1>Create Account</n-h1>

      <n-form-item path="email" label="Email">
        <n-input v-model:value="formData.email" type="text" @keydown.enter.prevent />
      </n-form-item>

      <n-form-item path="name" label="Username">
        <n-input v-model:value="formData.name" type="text" clearable @keydown.enter.prevent />
      </n-form-item>

      <n-form-item path="password" label="Password">
        <n-input v-model:value="formData.password" type="password" show-password-on="click" @keydown.enter.prevent />
      </n-form-item>

      <n-collapse-transition :show="Boolean(error)">
        <n-form-item>
          <n-text type="error"> Error:{{ errorMessage }} </n-text>
        </n-form-item>
      </n-collapse-transition>

      <n-form-item>
        <n-space style="width: 100%" :wrap-item="false">
          <n-button :loading="isLoading" :type="error ? 'error' : 'primary'" style="flex: 1" @click="onSubmit">
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
