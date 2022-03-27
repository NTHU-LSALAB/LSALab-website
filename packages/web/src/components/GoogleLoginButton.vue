<template>
  <n-button class="!w-full" size="large" @click="googleLogin">
    <div class="flex w-full items-center justify-between">
      <img :src="Google" class="h-5 w-5" />
      <span class="ml-2 text-base font-bold">Continue with Google</span>
    </div>
  </n-button>
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/store";
import { NButton } from "naive-ui";
import Google from "@/assets/google.png";

const authStore = useAuthStore();

const emits = defineEmits(["success"]);

// handle login callback
const onMessage = (message: any) => {
  const { data } = message;
  authStore.getToken(data).then(() => emits("success"));
};

const googleLogin = () => {
  window.removeEventListener("message", onMessage);
  const top = screen.height / 2 - 300;
  const left = screen.width / 2 - 300;
  const loginWindow = window.open(
    `${import.meta.env.VITE_STRAPI_ENDPOINT}/api/connect/google`,
    "",
    `toolbar=no,menubar=no,height=600,width=600,top=${top},left=${left}`
  );
  loginWindow?.focus();
  window.addEventListener("message", onMessage, false);
};
</script>
