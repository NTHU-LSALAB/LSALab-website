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
    <h1 class="text-3xl font-bold">Forgot Password</h1>
    <p class="mt-2 mb-4 text-base font-thin">
      Please enter the email used to sign up. <br />
      We will send the instructions to reset your password to your email
    </p>
    <n-form ref="formRef" :model="form" :rules="rules">
      <n-form-item path="identifier" :show-label="false">
        <n-input v-model:value="form.email" size="large" placeholder="Email" />
      </n-form-item>
      <n-form-item class="mt-2" :show-label="false" :show-feedback="false">
        <n-button
          class="!mt-2 !w-full"
          size="large"
          type="primary"
          @click="onSubmit"
        >
          Confirm
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
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const message = useMessage();
const formRef = ref<typeof NForm | null>(null);
const form = ref({ email: "" });
const rules: FormRules = {
  email: [{ type: "email", message: "請輸入合法信箱", trigger: ["input"] }],
};
const onSubmit = (e: MouseEvent) => {
  e.preventDefault();
  if (!formRef.value) return;
  return formRef.value
    .validate()
    .then(() => authStore.forgetPassword({ email: form.value.email }))
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