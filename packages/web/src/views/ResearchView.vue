<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="mb-4 text-2xl font-bold">{{ t("nav.research") }}</div>
    <div v-for="field in fields">
      <div class="text-xl">{{ field.attributes.name }}</div>
      <div class="my-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          class="cursor-pointer overflow-hidden rounded-md border shadow-app dark:border-[#FFFFFF10]"
          v-for="topic in field.attributes.topics.data"
        >
          <router-link :to="`/research/${topic.attributes.label}`">
            <n-tooltip>
              <template #trigger>
                <div class="p-2 pb-0 text-lg line-clamp-1">
                  {{ topic.attributes.name }}
                </div>
              </template>
              {{ topic.attributes.name }}
            </n-tooltip>
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
import { NTooltip } from "naive-ui";
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
