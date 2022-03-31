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
    <h1 class="text-3xl font-bold">Welcome To Our Lab</h1>
    <p class="mt-2 mb-4 text-base font-thin">
      Create an account to have more access on the website
    </p>
    <google-login-button @success="onSuccess" />
    <n-divider>or</n-divider>
    <n-form ref="formRef" :model="form" :rules="rules">
      <n-form-item path="username" :show-label="false">
        <n-input
          v-model:value="form.username"
          size="large"
          placeholder="Username"
        />
      </n-form-item>
      <n-form-item path="email" :show-label="false">
        <n-input
          v-model:value="form.email"
          class="mt-2"
          size="large"
          placeholder="Email"
        />
      </n-form-item>
      <n-form-item path="password" :show-label="false">
        <n-input
          v-model:value="form.password"
          class="mt-2"
          size="large"
          type="password"
          show-password-on="click"
          placeholder="Password"
        />
      </n-form-item>
      <n-form-item :show-label="false" :show-feedback="false">
        <n-button
          class="!mt-2 !w-full"
          size="large"
          type="primary"
          @click="onSubmit"
        >
          Create account
        </n-button>
      </n-form-item>
    </n-form>
    <div class="my-5 text-center text-base">
      <span class="mr-1">Already have an account?</span>
      <router-link to="/login" class="text-primary hover:underline">
        Log in
      </router-link>
    </div>
    <div class="text-center text-xs text-gray-400">
      By clicking "Create account", you accept the
      <router-link
        to="/article/lsalab-privacy-policy"
        class="text-primary hover:underline"
      >
        Privacy Policy
      </router-link>
      and the
      <router-link
        to="/article/lsalab-terms-of-service"
        class="text-primary hover:underline"
      >
        TOS
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
  NDivider,
} from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Logo from "@/assets/logo.png";
import GoogleLoginButton from "@/components/GoogleLoginButton.vue";
const router = useRouter();

const authStore = useAuthStore();
const message = useMessage();
const formRef = ref<typeof NForm | null>(null);
const form = ref({ username: "", email: "", password: "" });
const rules: FormRules = {
  username: [
    { required: true, message: "請輸入使用者名稱", trigger: ["input"] },
    {
      validator: (rule, value) => {
        return value.length >= 3;
      },
      message: "使用者名稱長度至少為3",
      trigger: ["input"],
    },
  ],
  email: [
    { required: true, message: "請輸入信箱", trigger: ["input"] },
    { type: "email", message: "信箱格式錯誤", trigger: ["input"] },
  ],
  password: [
    {
      required: true,
      message: "請輸入密碼",
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
};
const onSubmit = (e: MouseEvent) => {
  e.preventDefault();
  if (!formRef.value) return;
  return formRef.value
    .validate()
    .then(() =>
      authStore
        .register(form.value)
        .then(() => router.push({ name: "HomeView" }))
    )
    .catch(() => {
      message.error("Invalid");
    });
};
const onSuccess = () => router.push({ name: "HomeView" });
</script>

<style scoped lang="scss">
::v-deep(.n-divider) {
  margin: 15px 0;
}
::v-deep(.n-form-item-feedback-wrapper) {
  min-height: 0 !important;
}
</style>
