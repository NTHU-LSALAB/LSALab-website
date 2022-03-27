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
      Sign in to have more access on the website
    </p>
    <google-login-button @success="onSuccess" />
    <n-divider>or</n-divider>
    <n-form ref="formRef" :model="form" :rules="rules">
      <n-form-item path="identifier" :show-label="false">
        <n-input
          v-model:value="form.identifier"
          size="large"
          placeholder="Username / Email"
        />
      </n-form-item>
      <n-form-item path="password" :show-label="false">
        <n-input
          v-model:value="form.password"
          class="!mt-2"
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
          Sign in
        </n-button>
      </n-form-item>
    </n-form>
    <div class="mt-5 text-center text-base">
      <span class="mr-1">No account?</span>
      <router-link to="/register" class="text-primary hover:underline">
        Create one
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
import Logo from "@/assets/logo.png";
import GoogleLoginButton from "@/components/GoogleLoginButton.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const redirectURI = route.query["redirect-uri"]?.toString();

const authStore = useAuthStore();
const message = useMessage();
const formRef = ref<typeof NForm | null>(null);
const form = ref({ identifier: "", password: "" });
const rules: FormRules = {
  identifier: [
    { required: true, message: "請輸入使用者名稱或信箱", trigger: ["input"] },
    {
      validator: (rule, value) => {
        return value.length >= 3;
      },
      message: "信箱格式錯誤",
      trigger: ["input"],
    },
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
  formRef.value.validate((errors: Error[]) => {
    if (!errors) {
      authStore.login(form.value).then(() => router.push(redirectURI || "/"));
    } else {
      message.error("Invalid");
    }
  });
};
const onSuccess = () => router.push(redirectURI || "/");
</script>

<style scoped lang="scss">
::v-deep(.n-divider) {
  margin: 15px 0;
}
::v-deep(.n-form-item-feedback-wrapper) {
  min-height: 0 !important;
}
</style>
