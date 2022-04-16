<template>
  <div class="text-2xl font-bold">{{ t("nav.pub") }}</div>
  <div class="mt-4 flex flex-wrap">
    <n-form-item label="Category" class="w-1/2 pr-2" :show-feedback="false">
      <n-select
        v-model:value="category"
        placeholder="Category"
        multiple
        :options="categorys"
      />
    </n-form-item>
    <n-form-item label="Venue" class="w-1/2" :show-feedback="false">
      <n-select
        v-model:value="venue"
        placeholder="Venue"
        multiple
        :options="venues"
      />
    </n-form-item>
    <n-form-item label="Year" class="mt-2 w-1/2 pr-2" :show-feedback="false">
      <n-select
        v-model:value="year"
        placeholder="Year"
        multiple
        :options="years"
      />
    </n-form-item>
  </div>
  <div class="mt-5 grid gap-5 xl:grid-cols-2">
    <n-card
      v-for="pub in filteredPubs"
      :id="pub.id"
      :key="pub.id"
      :ref="setPubRef"
      size="small"
      style="position: relative; overflow: hidden"
    >
      <div
        v-if="pub.attributes.award"
        class="absolute right-[2px] top-[2px] drop-shadow-md"
      >
        <n-tooltip>
          <template #trigger>
            <n-icon size="20" color="#ffcc00">
              <star24-filled />
            </n-icon>
          </template>
          {{ pub.attributes.award }}
        </n-tooltip>
      </div>
      <div class="flex">
        <div class="flex-grow">
          <n-ellipsis tooltip :line-clamp="2">
            <div class="text-lg font-bold">
              <a
                class="title cursor-pointer hover:underline"
                :href="pub.attributes.webLink"
                >{{ pub.attributes.title }}</a
              >
            </div>
            <template #tooltip>
              <div class="w-[400px]">{{ pub.attributes.title }}</div>
            </template>
          </n-ellipsis>
          <div class="mt-2 italic">
            <template
              v-for="(member, mid) in pub.attributes.members"
              :key="mid"
            >
              <span v-if="member === 'Jerry Chou'" class="font-extrabold">{{
                member
              }}</span>
              <span v-else class="text-gray-500">{{ member }}</span>
              <span v-if="mid !== pub.attributes.members.length - 1">
                {{ ", " }}
              </span>
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
            >Slides</a
          >
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
            v-for="(tag, i) in pub.attributes.tags"
            :key="i"
            :focusable="false"
            class="!mr-1 !mb-1"
            size="tiny"
            secondary
            >{{ tag }}</n-button
          >
        </div>
      </template>
    </n-card>
  </div>
  <div ref="spinner" class="mt-2 flex justify-center">
    <n-spin v-if="loadingPubs" size="small" />
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
import { computed, nextTick, onBeforeUpdate, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import moment from "moment";
const emits = defineEmits(["ready", "select"]);
const props = defineProps({
  highlight: {
    type: [Number, String],
    required: false,
    default: undefined,
  },
});

const { t } = useI18n();
const pubStore = usePubStore();

// pub refs
const pubRefs = ref<any[]>([]);
const setPubRef = (el: any) => {
  if (el) pubRefs.value?.push(el);
};
onBeforeUpdate(() => {
  pubRefs.value = [];
});
const gotoTarget = () => {
  if (props.highlight && pubLoaded.value) {
    const id =
      typeof props.highlight === "string"
        ? parseInt(props.highlight)
        : props.highlight;
    const target = pubRefs.value.find((ref) => ref.$attrs.id === id);
    if (target) {
      nextTick(() => {
        target.$el.querySelector(".title").classList.add("highlight");
        target.$el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
    emits("ready");
  }
};
onMounted(gotoTarget);
watch([() => pubRefs.value.length, () => props.highlight], gotoTarget);

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
    filtered = filtered.filter(
      (pub: Publication) =>
        category.value?.includes(pub.attributes.field.data.id) ?? false
    );
  if (venue.value.length)
    filtered = filtered.filter(
      (pub: Publication) =>
        venue.value?.includes(pub.attributes.venue.data.id) ?? false
    );
  if (year.value.length)
    filtered = filtered.filter(
      (pub: Publication) =>
        year.value?.includes(
          pub.attributes.year || moment(pub.attributes.date).year()
        ) ?? false
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
const pubLoaded = computed(() => pubStore.pubLoaded);

if (pubLoaded.value) emits("ready");
watch(pubLoaded, (val) => {
  if (val) {
    emits("ready");
  }
});

const venues = computed(() =>
  (pubStore.venues || []).map((f: Venue) => ({
    value: f.id,
    label: f.attributes.name,
  }))
);

const getImageURL = (url: string) => {
  return `${import.meta.env.VITE_STRAPI_ENDPOINT}/${url}`;
};
</script>

<style lang="scss" scoped>
.title.highlight {
  font-style: none !important;
  background: yellow;
}
</style>
