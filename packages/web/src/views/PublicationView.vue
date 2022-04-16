<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <advisor-pub :highlight="highlight" @ready="emits('ready')" />
  </div>
</template>

<script setup lang="ts">
import AdvisorPub from "@/components/_advisor/AdvisorPub.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const emits = defineEmits(["ready"]);

const route = useRoute();
const highlight = computed(() => route.query.highlight?.toString());
</script>
