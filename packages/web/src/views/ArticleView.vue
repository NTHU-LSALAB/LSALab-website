<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <markdown :class="{ dark: mode === 'dark' }" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, defineAsyncComponent, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import "@/theme/markdown.css";
import { useSettingStore } from "@/store";
const route = useRoute();
const router = useRouter();
const emits = defineEmits(["ready"]);
const settingStore = useSettingStore();

const mode = computed(() => settingStore.mode);

const markdown = computed(() => {
  return article.value ? defineAsyncComponent(article.value) : h("div");
});
const article = ref<any>(null);

const updateArticle = () => {
  const { articleName } = route.params;
  const hash = route.hash.replace("#", "/");
  // make sure the path is /article/:articleName
  if (articleName) {
    const modules = import.meta.glob("/src/assets/markdown/**/*.md");
    const module =
      modules[`/src/assets/markdown/${articleName}${hash}.md`] ||
      modules[`/src/assets/markdown/${articleName}/index.md`];
    if (module !== undefined) {
      article.value = module;
      emits("ready");
    } else {
      router.replace("/not-found");
    }
  }
};
onMounted(updateArticle);
watch(route, updateArticle, { immediate: true });
</script>
