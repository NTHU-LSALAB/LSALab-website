<template>
  <div
    class="absolute left-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2"
    style="top: calc(50% - 60px)"
  >
    <div class="flex justify-center">
      <router-link to="/">
        <img :src="Logo" class="mb-10 w-20" />
      </router-link>
    </div>
    <h1 class="text-3xl font-bold">Reset Password</h1>
    <p class="mt-2 mb-4 text-base font-thin">
      Please enter your brand new password to reset
    </p>
    <n-form ref="formRef" :model="form" :rules="rules">
      <n-form-item path="password" :show-label="false">
        <n-input
          v-model:value="form.password"
          size="large"
          type="password"
          show-password-on="click"
          placeholder="New password"
        />
      </n-form-item>
      <n-form-item path="passwordConfirmation" :show-label="false">
        <n-input
          v-model:value="form.passwordConfirmation"
          class="!mt-2"
          size="large"
          type="password"
          show-password-on="click"
          placeholder="Confirm Password"
        />
      </n-form-item>
      <n-form-item class="mt-2" :show-label="false" :show-feedback="false">
        <n-button
          class="!mt-2 !w-full"
          size="large"
          type="primary"
          @click="onSubmit"
        >
          Reset
        </n-button>
      </n-form-item>
    </n-form>
    <div class="mt-5 text-center text-base">
      <span class="mr-1">Have an account?</span>
      <router-link to="/login" class="text-primary hover:underline">
        Sign in
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store";
import {
  NInput,
  NButton,
  NForm,
  NFormItem,
  FormRules,
  useMessage,
} from "naive-ui";
import Logo from "@/assets/logo.png";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();
const message = useMessage();
if (!route.query.code) {
  message.error("No code found!");
  router.push("/login");
}
const formRef = ref<typeof NForm | null>(null);
const form = ref({ password: "", passwordConfirmation: "" });
const rules: FormRules = {
  password: [
    {
      required: true,
      message: "請輸入新密碼密碼",
      trigger: ["input"],
    },
    {
      validator: (rule, value) => {
        return value.length >= 8 && value.length <= 16;
      },
      message: "密碼長度應為8~16位",
      trigger: ["input"],
    },
  ],
  passwordConfirmation: [
    {
      required: true,
      message: "請輸入確認密碼",
      trigger: ["input"],
    },
    {
      validator: (rule, value) => {
        return value === form.value.password;
      },
      message: "與新密碼不相符",
      trigger: ["input"],
    },
  ],
};
const onSubmit = (e: MouseEvent) => {
  e.preventDefault();
  if (!formRef.value) return;
  return formRef.value
    .validate()
    .then(() => {
      if (!route.query.code) return;
      authStore
        .resetPassword({
          code: route.query.code.toString(),
          password: form.value.password,
          passwordConfirmation: form.value.passwordConfirmation,
        })
        .then(() => router.push("/login"));
    })
    .catch(() => {
      message.error("Invalid");
    });
};
</script>

<style scoped lang="scss">
::v-deep(.n-form-item-feedback-wrapper) {
  min-height: 0 !important;
}
</style>
