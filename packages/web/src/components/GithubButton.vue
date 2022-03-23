<template>
  <n-button
    @click="goGithub"
    circle
    style="border-radius: 10px"
    :focusable="false"
    ghost
    :color="mode === 'light' ? '#e0e0e6' : '#132f4c'"
  >
    <template #icon>
      <n-icon style="transform: scale(1.2)" class="text-primary">
        <logo-github />
      </n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { LogoGithub } from "@vicons/ionicons5";
import { computed } from "vue";
import { useSettingStore } from "@/store";

const store = useSettingStore();
const mode = computed(() => store.mode);

const goGithub = () => {
  location.href = "https://github.com/orgs/NTHU-LSALAB/dashboard";
};
</script>
