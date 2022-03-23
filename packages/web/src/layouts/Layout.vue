<template>
  <app-header />
  <div class="min-h-screen pt-20" ref="target">
    <router-view @ready="onReady" />
  </div>
  <n-back-top :right="100" />
  <app-footer v-if="showFooter" />
  <app-dev v-if="dev" />
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { NBackTop } from "naive-ui";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import AppDev from "@/components/AppDev.vue";
import { useCachedRequest } from "@/composables/useCachedRequest";
const emits = defineEmits(["ready"]);
const route = useRoute();
const showFooter = computed(() => route.name !== "CalendarView");
const onReady = () => {
  window.scrollTo(0, 0);
  emits("ready");
};
const target = ref();
const { item: status } =
  useCachedRequest<{ attributes: { dev: boolean } }>("status");
const dev = computed(() => status.value?.attributes.dev);
</script>
