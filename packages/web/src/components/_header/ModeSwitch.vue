<template>
  <app-outline-button @click="toggleMode">
    <template #icon>
      <moon-stars v-if="mode === 'light'" color="#839ecc" />
      <sun v-if="mode === 'dark'" color="#ffd900" />
    </template>
  </app-outline-button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { MoonStars, Sun } from "@vicons/tabler";
import { useSettingStore } from "@/store";
import AppOutlineButton from "@/components/AppOutlineButton.vue";

const store = useSettingStore();
const toggleMode = () => {
  store.toggleMode();
};
const mode = computed(() => store.mode);
</script>
