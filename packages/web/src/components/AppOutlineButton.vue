<template>
  <div>
    <n-button
      @click="emits('click')"
      circle
      style="border-radius: 10px"
      :focusable="false"
      ghost
      :color="mode === 'light' ? '#e0e0e6' : '#132f4c'"
    >
      <template #icon>
        <n-icon style="transform: scale(1.2)">
          <slot name="icon"></slot>
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingStore } from "@/store";
import { NButton, NIcon } from "naive-ui";

const emits = defineEmits<{ (e: "click"): void }>();

const store = useSettingStore();
const mode = computed(() => store.mode);
</script>
