<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <advisor-pub />
  </div>
</template>

<script setup lang="ts">
import AdvisorPub from "@/components/_advisor/AdvisorPub.vue";
import { useI18n } from "vue-i18n";
const emits = defineEmits(["ready"]);
emits("ready");
const { t } = useI18n();
</script>
