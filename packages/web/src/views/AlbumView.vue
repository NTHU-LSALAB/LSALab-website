<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="text-2xl font-bold">{{ t("nav.album") }}</div>

    <n-spin :show="loading">
      <n-carousel
        draggable
        class="mt-4 rounded-md bg-gray-100 py-2 dark:bg-gray-700"
        :space-between="20"
        show-arrow
        :show-dots="false"
        slides-per-view="auto"
      >
        <template v-if="files && files.length">
          <n-carousel-item
            v-for="(file, i) in files"
            :key="i"
            style="width: fit-content"
          >
            <div class="h-[450px] w-fit overflow-hidden rounded-md">
              <n-image
                object-fit="contain"
                :src="
                  file.webContentLink ||
                  'https://via.placeholder.com/300x150?text=LSA+Lab'
                "
              />
            </div>
          </n-carousel-item>
        </template>
        <n-carousel-item v-else>
          <div class="flex h-[450px] justify-center overflow-hidden">
            <n-image
              object-fit="contain"
              src="https://via.placeholder.com/300x150?text=LSA+Lab"
            />
          </div>
        </n-carousel-item>
        <template #arrow="{ prev, next }">
          <div class="absolute bottom-1 right-1">
            <n-button
              text
              type="primary"
              class="!mr-2 !rounded-md !bg-white !p-1 !shadow-5"
              @click="prev"
            >
              <n-icon size="20"><arrow-back /></n-icon>
            </n-button>
            <n-button
              text
              type="primary"
              class="!mr-2 !rounded-md !bg-white !p-1 !shadow-5"
              @click="next"
            >
              <n-icon size="20"><arrow-forward /></n-icon>
            </n-button>
          </div>
        </template>
      </n-carousel>
    </n-spin>

    <div
      v-if="folders.length"
      class="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4"
    >
      <n-card
        v-for="(folder, i) in folders"
        :key="i"
        class="cursor-pointer border hover:bg-gray-200 dark:hover:bg-gray-700"
        size="small"
        :bordered="false"
        :class="
          selectedFolderId !== folder.id
            ? 'border-gray-200 dark:border-[#FFFFFF10]'
            : 'border-primary'
        "
        @click="select(folder.id)"
      >
        <div class="flex items-center">
          <albums-outline class="w-6" />
          <span class="ml-2">{{ folder.name }}</span>
        </div>
        <div class="mt-2 flex aspect-video items-center justify-center">
          <img
            v-if="folder.preview && folder.preview.thumbnailLink"
            :src="folder.preview.thumbnailLink"
            class="h-full rounded-md"
          />
          <n-empty v-else description="Empty"></n-empty>
        </div>
      </n-card>
    </div>
    <div
      v-else
      class="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4"
    >
      <n-skeleton v-for="i in 12" :key="i" height="70px" :sharp="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  NCarousel,
  NImage,
  NCard,
  NSkeleton,
  NEmpty,
  NCarouselItem,
  NButton,
  NIcon,
  NSpin,
} from "naive-ui";
import { AlbumsOutline } from "@vicons/ionicons5";
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useAlbumStore } from "@/store";
const emits = defineEmits(["ready"]);
const { t } = useI18n();
const albumStore = useAlbumStore();
const selectedFolderId = computed(() => albumStore.folderId);
const folders = computed(() => albumStore.folders);
const loading = computed(() => albumStore.loading);
const files = computed(() => albumStore.files);
albumStore.fetchFolders().then(() => emits("ready"));

const select = (folderId: string) => {
  albumStore.fetchFiles(folderId);
};
</script>
