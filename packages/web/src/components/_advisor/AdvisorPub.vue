<template>
  <div class="text-2xl font-bold">{{ t("nav.pub") }}</div>
  <div class="mt-4 flex flex-wrap">
    <n-form-item label="Category" class="w-1/2 pr-2" :show-feedback="false">
      <n-select
        placeholder="Category"
        v-model:value="category"
        multiple
        :options="categorys"
      />
    </n-form-item>
    <n-form-item label="Venue" class="w-1/2" :show-feedback="false">
      <n-select
        placeholder="Venue"
        v-model:value="venue"
        multiple
        :options="venues"
      />
    </n-form-item>
    <n-form-item label="Year" class="mt-2 w-1/2 pr-2" :show-feedback="false">
      <n-select
        placeholder="Year"
        v-model:value="year"
        multiple
        :options="years"
      />
    </n-form-item>
  </div>
  <div class="mt-5 grid gap-5 xl:grid-cols-2">
    <n-card
      size="small"
      v-for="pub in filteredPubs"
      style="position: relative; overflow: hidden"
    >
      <div
        class="absolute right-[2px] top-[2px] drop-shadow-md"
        v-if="pub.attributes.award"
      >
        <n-tooltip>
          <template #trigger>
            <n-icon size="20" color="#ffcc00"><star24-filled /> </n-icon>
          </template>
          {{ pub.attributes.award }}
        </n-tooltip>
      </div>
      <div class="flex">
        <div class="flex-grow">
          <n-ellipsis tooltip :line-clamp="2">
            <div class="text-lg font-bold">
              <a
                class="cursor-pointer hover:underline"
                :href="pub.attributes.webLink"
              >
                {{ pub.attributes.title }}
              </a>
            </div>
            <template #tooltip>
              <div class="w-[400px]">
                {{ pub.attributes.title }}
              </div>
            </template>
          </n-ellipsis>
          <div class="mt-2 italic">
            <template v-for="(member, mid) in pub.attributes.members">
              <span class="font-extrabold" v-if="member === 'Jerry Chou'">
                {{ member }}
              </span>
              <span v-else class="text-gray-500">{{ member }}</span>
              <span v-if="mid !== pub.attributes.members.length - 1">, </span>
            </template>
          </div>
        </div>
        <div
          v-if="pub.attributes.image.data"
          class="ml-4 flex h-full w-40 flex-shrink-0 items-center"
        >
          <img
            class="w-full"
            object-fit="contain"
            :src="getImageURL(pub.attributes.image.data.attributes.url)"
          />
        </div>
      </div>
      <template #footer>
        <n-ellipsis tooltip line-clamp="2">
          <div class="text-sm">
            <span>{{ pub.attributes.venueName }}</span>
            <span v-if="pub.attributes.year">, {{ pub.attributes.year }}</span>
            <span v-if="pub.attributes.date"
              >, {{ moment(pub.attributes.date).format("MMM YYYY") }}</span
            >
          </div>
          <template #tooltip>
            <div class="w-[400px]">
              <span>{{ pub.attributes.venueName }}</span>
              <span v-if="pub.attributes.year"
                >, {{ pub.attributes.year }}</span
              >
              <span v-if="pub.attributes.date"
                >, {{ moment(pub.attributes.date).format("MMM YYYY") }}</span
              >
            </div>
          </template>
        </n-ellipsis>
        <div>
          <a
            v-if="pub.attributes.slidesLink"
            class="mr-1 text-blue-400 hover:underline"
            :href="pub.attributes.slidesLink"
          >
            Slides
          </a>
          <a
            v-if="pub.attributes.videoLink"
            class="mr-1 text-blue-400 hover:underline"
            :href="pub.attributes.videoLink"
            >Video</a
          >
          <a
            v-if="pub.attributes.codeLink"
            class="mr-1 text-blue-400 hover:underline"
            :href="pub.attributes.codeLink"
            >Code</a
          >
        </div>
        <div v-if="pub.attributes.tags" class="mt-1">
          <n-button
            :focusable="false"
            class="!mr-1 !mb-1"
            size="tiny"
            secondary
            v-for="tag in pub.attributes.tags"
          >
            {{ tag }}
          </n-button>
        </div>
      </template>
    </n-card>
  </div>
  <div class="mt-2 flex justify-center" ref="spinner">
    <n-spin size="small" v-if="loadingPubs" />
  </div>
</template>

<script setup lang="ts">
import { Field, Publication, Venue } from "@/store/pub";
import { usePubStore } from "@/store";
import {
  NSelect,
  NCard,
  NFormItem,
  NButton,
  NEllipsis,
  NTooltip,
  NIcon,
  NSpin,
} from "naive-ui";
import { Star24Filled } from "@vicons/fluent";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import moment from "moment";
const emits = defineEmits(["ready", "select"]);
emits("ready");

const { t } = useI18n();
const pubStore = usePubStore();

// spinner
const spinner = ref();

// n-select value
const category = ref<number[]>([]);
const venue = ref<number[]>([]);
const year = ref<number[]>([]);

// filted pubs
const filteredPubs = computed(() => {
  let filtered = pubs.value || [];
  if (category.value.length)
    filtered = filtered.filter((pub: Publication) =>
      category.value!.includes(pub.attributes.field.data.id)
    );
  if (venue.value.length)
    filtered = filtered.filter((pub: Publication) =>
      venue.value!.includes(pub.attributes.venue.data.id)
    );
  if (year.value.length)
    filtered = filtered.filter((pub: Publication) =>
      year.value!.includes(
        pub.attributes.year || moment(pub.attributes.date).year()
      )
    );
  return filtered;
});

// get exactly existing years
const years = computed(() => {
  const dict: any = {};
  for (let pub of pubs.value || []) {
    const y = pub.attributes.year || moment(pub.attributes.date).year();
    if (!isNaN(y) && !dict[y]) dict[y] = true;
  }
  return Object.keys(dict)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map((y) => ({ label: y, value: parseInt(y) }));
});

const categorys = computed(() =>
  (pubStore.fields || []).map((f: Field) => ({
    value: f.id,
    label: f.attributes.name,
  }))
);

const pubs = computed(() => pubStore.pubs);

const loadingPubs = computed(() => pubStore.loadingPubs);

const venues = computed(() =>
  (pubStore.venues || []).map((f: Venue) => ({
    value: f.id,
    label: f.attributes.name,
  }))
);

const getImageURL = (url: string) => {
  return `${import.meta.env.VITE_STRAPI_ENDPOINT}/${url}`;
};

const onScroll = () => {
  var element = document.documentElement;
  if (spinner.value.offsetTop - element.scrollTop <= window.innerHeight) {
    pubStore.loadPubs();
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
