<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import isEmail from "@/utils/is-email";
import type { FormInst, FormRules } from "naive-ui";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const error = ref<any | undefined>();
const isLoading = ref(false);

const errorMessage = computed(() => {
  switch (error.value?.response?.status) {
    case 404: {
      return "User not found.";
    }
    default: {
      return error.value?.message || "Unknown error.";
    }
  }
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

const onSubmit = async (event: MouseEvent) => {
  event.preventDefault();

  try {
    await formRef.value!.validate();
  } catch {
    return;
  }

  try {
    isLoading.value = true;
    error.value = undefined;

    const identifier = isEmail(formData.value.identifier) ? "email" : "name";

    await authStore.login({
      [identifier]: formData.value.identifier,
      password: formData.value.password,
    });

    await router.push({ name: "home" });
  } catch (error_) {
    error.value = error_;
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
    <n-form ref="formRef" :model="formData" size="large" :rules="rules" :validate-messages="{ required: 'Required.' }">
      <n-h1>Login</n-h1>

      <n-form-item path="identifier" label="username or Email">
        <n-input v-model:value="formData.identifier" type="text" @keydown.enter.prevent />
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
                <fa-user v-else />
              </n-icon>
            </template>

            <template #default> Login </template>
          </n-button>

          <n-button style="flex: 1" @click="router.push({ name: 'register' })">
            <template #icon>
              <n-icon>
                <fa-user />
              </n-icon>
            </template>

            <template #default> Register </template>
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </n-space>
</template>
