<template>
  <router-view v-if="mounted" @ready="onReady" />
</template>
<script setup lang="ts">
import { useLoadingBar, useMessage } from "naive-ui";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useComponentStore, useAuthStore } from "@/store";
const authStore = useAuthStore();
const message = useMessage();
const loadingBar = useLoadingBar();
const componentStore = useComponentStore();
componentStore.$subscribe((mutation, state) => {
  if (state.showLoadingBar) {
    loadingBar.start();
  } else {
    loadingBar.finish();
  }
  if (state.showMessage) {
    message.error(componentStore.message);
    componentStore.hideMessage();
  }
});
const onReady = () => {
  componentStore.finishLoading();
};
const mounted = ref(false);
let interval: any;
onMounted(() => {
  authStore.checkToken();
  interval = setInterval(authStore.checkToken, 10 * 1000);
  const splashScreen = document.getElementById("splash-screen");
  if (splashScreen) {
    setTimeout(() => {
      mounted.value = true;
      nextTick(() => {
        splashScreen.style.opacity = "0";
        setTimeout(() => {
          splashScreen.parentNode?.removeChild(splashScreen);
        }, 1000);
      });
    }, 1000);
  } else {
    mounted.value = true;
  }
});
onUnmounted(() => {
  clearInterval(interval);
});
</script>
