<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <advisor-pub />
  </div>
</template>

<script setup lang="ts">
import AdvisorPub from "@/components/_advisor/AdvisorPub.vue";
const emits = defineEmits(["ready"]);
emits("ready");
</script>
