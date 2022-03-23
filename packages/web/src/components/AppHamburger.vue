<template>
  <div>
    <n-button
      @click="showDrawer = true"
      circle
      style="border-radius: 10px"
      :focusable="false"
      ghost
      :color="mode === 'light' ? '#e0e0e6' : '#132f4c'"
    >
      <template #icon>
        <n-icon style="transform: scale(1.2)" class="text-primary">
          <menu-round />
        </n-icon>
      </template>
    </n-button>
    <n-drawer v-model:show="showDrawer" :width="270" placement="left">
      <n-drawer-content title="LSA Lab" closable>
        <n-menu
          :value="props.modelValue"
          @update-value="onUpdate"
          :options="props.options"
          :root-indent="0"
          :default-expanded-keys="[]"
        />
        <app-auth-button in-drawer />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  NButton,
  NIcon,
  NDrawer,
  NDrawerContent,
  NMenu,
  NDivider,
} from "naive-ui";
import { MenuRound } from "@vicons/material";
import { ref, PropType, computed } from "vue";
import { useSettingStore } from "@/store";
import AppAuthButton from "@/components/AppAuthButton.vue";

const store = useSettingStore();
const mode = computed(() => store.mode);
const props = defineProps({
  modelValue: String,
  options: {
    type: Array as PropType<any[]>,
  },
});
const showDrawer = ref(false);
const onUpdate = (e: string) => {
  emits("update:modelValue", e);
  showDrawer.value = false;
};
const emits = defineEmits(["update:modelValue"]);
</script>
