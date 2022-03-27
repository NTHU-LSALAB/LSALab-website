<template>
  <n-result
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    status="404"
    title="404 Not Found"
    description="You know life is always ridiculous."
  >
    <template #footer>
      <n-button secondary @click="router.back()">Go Back</n-button>
      <n-button
        class="!ml-2"
        type="primary"
        secondary
        @click="router.push('/')"
      >
        Go Home
      </n-button>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { NResult, NButton } from "naive-ui";
import { useRouter } from "vue-router";
const router = useRouter();
const emits = defineEmits(["ready"]);
emits("ready");
</script>
