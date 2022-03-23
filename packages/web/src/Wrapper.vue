<script setup lang="ts">
import {
  NMessageProvider,
  NConfigProvider,
  NLoadingBarProvider,
  NNotificationProvider,
  NGlobalStyle,
} from "naive-ui";
import App from "@/App.vue";
import { lightThemeOverrides, darkThemeOverrides } from "@/theme";
import { computed } from "vue";
import { darkTheme, lightTheme } from "naive-ui";
import { useSettingStore } from "@/store";
const store = useSettingStore();
store.init();

const themeOverrides = computed(() =>
  store.mode === "light" ? lightThemeOverrides : darkThemeOverrides
);
const theme = computed(() => (store.mode === "light" ? lightTheme : darkTheme));
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-notification-provider placement="bottom-right">
      <n-loading-bar-provider>
        <n-message-provider>
          <app />
          <n-global-style />
        </n-message-provider>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
