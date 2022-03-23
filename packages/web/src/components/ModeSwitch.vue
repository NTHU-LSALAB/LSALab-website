<template>
  <n-button
    ghost
    @click="toggleMode"
    circle
    style="border-radius: 10px"
    :color="mode === 'light' ? '#e0e0e6' : '#132f4c'"
    :focusable="false"
  >
    <template #icon>
      <n-icon style="transform: scale(1.2)">
        <moon-stars v-if="mode === 'light'" color="#839ecc" />
        <sun v-if="mode === 'dark'" color="#ffd900" />
      </n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NIcon, NButton } from "naive-ui";
import { MoonStars, Sun } from "@vicons/tabler";
import { useSettingStore } from "@/store";

const store = useSettingStore();
const toggleMode = () => {
  store.toggleMode();
};
const mode = computed(() => store.mode);
</script>
