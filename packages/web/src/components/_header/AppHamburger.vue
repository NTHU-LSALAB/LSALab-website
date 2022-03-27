<template>
  <div>
    <app-outline-button @click="showDrawer = true">
      <template #icon>
        <menu-round class="text-primary" />
      </template>
    </app-outline-button>
    <n-drawer v-model:show="showDrawer" :width="270" placement="left">
      <n-drawer-content title="LSA Lab" closable>
        <n-menu
          :value="props.modelValue"
          :options="props.options"
          :root-indent="0"
          :default-expanded-keys="[]"
          @update-value="onUpdate"
        />
        <app-auth-button in-drawer />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { NDrawer, NDrawerContent, NMenu } from "naive-ui";
import { MenuRound } from "@vicons/material";
import { ref, PropType } from "vue";
import AppAuthButton from "@/components/_header/AppAuthButton.vue";
import AppOutlineButton from "@/components/AppOutlineButton.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: () => "",
  },
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});
const showDrawer = ref(false);
const onUpdate = (e: string) => {
  emits("update:modelValue", e);
  showDrawer.value = false;
};
const emits = defineEmits(["update:modelValue"]);
</script>
