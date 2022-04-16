<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="mb-4 text-2xl font-bold">{{ t("nav.research") }}</div>
    <div v-for="field in fields" :key="field.id">
      <div class="text-xl">{{ field.attributes.name }}</div>
      <div class="my-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="topic in field.attributes.topics.data"
          :key="topic.id"
          class="cursor-pointer overflow-hidden rounded-md border shadow-app dark:border-[#FFFFFF10]"
        >
          <router-link :to="`/research/${topic.attributes.type}`">
            <n-ellipsis tooltip class="!p-2 !pb-0 text-lg">
              <template #trigger>
                {{ topic.attributes.name }}
              </template>
              {{ topic.attributes.name }}
            </n-ellipsis>
            <div class="mt-2 flex aspect-video flex-grow justify-center">
              <img
                :src="
                  getImageURL(topic.attributes.image.data?.attributes.url) ||
                  Logo
                "
                class="h-full"
              />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.png";
import { NEllipsis } from "naive-ui";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { usePubStore } from "@/store";
const pubStore = usePubStore();
const emits = defineEmits(["ready"]);
emits("ready");
const { t } = useI18n();

const fields = computed(() => pubStore.fields);

const getImageURL = (url: string) => {
  if (!url) return null;
  return `${import.meta.env.VITE_STRAPI_ENDPOINT}/${url}`;
};
</script>
