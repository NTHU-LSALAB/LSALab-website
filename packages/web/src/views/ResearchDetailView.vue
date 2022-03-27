<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div v-if="topic" class="markdown-body" :class="{ dark: mode === 'dark' }">
      <h1>{{ topic.attributes.name }}</h1>
      <span class="text-[#808080]">Last updated: January 30, 2022</span>
      <h2>Research Background & Motivation</h2>
      <p>{{ topic.attributes.background }}</p>
      <h2>List of proposed solutions</h2>
      <h2>Lab members</h2>
      <h2>Collaborators</h2>
      <h2>Publications</h2>
      <ol>
        <li v-for="pub in topic.attributes.publications.data" :key="pub.id">
          <a :href="pub.attributes.webLink">{{ pub.attributes.title }}</a>
        </li>
      </ol>
      <h2>Software</h2>
      <h2>Tags</h2>
      <div>
        <n-card v-for="(tag, i) in topic.attributes.tags" :key="i" size="small">
          {{ tag }}
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import "@/theme/markdown.css";
import hljs from "highlight.js";
import { NCard } from "naive-ui";
import { usePubStore, useSettingStore } from "@/store";
const emits = defineEmits(["ready"]);
emits("ready");

const settingStore = useSettingStore();
const pubStore = usePubStore();
const route = useRoute();

const mode = computed(() => settingStore.mode);
const topic = computed(() => pubStore.topic);

const renderer = new marked.Renderer();
marked.setOptions({
  renderer,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  langPrefix: "hljs language-",
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});
const updateMD = () => {
  const { field } = route.params;
  // make sure the path is /research/:field
  if (field) pubStore.getTopic(field.toString());
};
onMounted(updateMD);
watch(route, updateMD, {
  immediate: true,
});
</script>
