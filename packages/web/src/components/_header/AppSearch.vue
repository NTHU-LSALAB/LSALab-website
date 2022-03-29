<template>
  <div>
    <n-button
      class="app-button"
      :class="{ small: width < 1240, dark: mode === 'dark' }"
      ghost
      circle
      :color="mode === 'light' ? '#e0e0e6' : '#132f4c'"
      style="border-radius: 10px"
      :focusable="false"
      @click="showSearch = true"
    >
      <n-icon size="20" class="text-primary"><search48-filled /></n-icon>
      <template v-if="width >= 1240">
        <span class="ml-3 mr-[72px] text-[#3E5060]">Search...</span>
        <span
          class="rounded border bg-white py-[2px] px-2 text-xs font-bold text-[#3E5060] dark:border-[#132f4c] dark:bg-[#001e3c] dark:text-[#b2bac2]"
        >
          /
        </span>
      </template>
    </n-button>
    <n-modal v-model:show="showSearch">
      <ais-instant-search :search-client="searchClient" index-name="lsalab">
        <div
          class="w-full overflow-hidden rounded-lg border bg-white shadow-app dark:border-[#132f4c] dark:bg-black md:w-[700px]"
          style="margin-top: calc(-50vh + 50%)"
        >
          <header
            class="flex items-center border-b px-1 py-2 dark:border-[#132f4c] md:px-3 md:py-4"
          >
            <ais-search-box class="w-full">
              <template #default="{ currentRefinement, refine }">
                <n-input
                  v-model:value="query"
                  :bordered="false"
                  size="large"
                  :value="currentRefinement"
                  style="
                    border-radius: 10px;
                    font-size: 20px;
                    background-color: transparent;
                  "
                  placeholder="Search..."
                  @update-value="refine"
                >
                  <template #prefix>
                    <n-icon
                      size="24"
                      class="search-icon mr-2 cursor-default text-primary"
                    >
                      <search />
                    </n-icon>
                  </template>
                </n-input>
              </template>
            </ais-search-box>
            <div
              class="mx-3 cursor-default rounded border bg-white py-[2px] px-2 text-base text-xs font-bold text-[#3E5060] dark:border-[#132f4c] dark:bg-[#001e3c] dark:text-[#b2bac2]"
              @click="showSearch = false"
            >
              esc
            </div>
          </header>
          <div
            v-if="query === ''"
            class="flex h-20 items-center justify-center"
          >
            No recent seraches
          </div>
          <n-scrollbar v-else style="max-height: 400px">
            <ais-hits
              :class-names="{
                'ais-Hits': 'mt-3',
                'ais-Hits-item': 'hit-item',
              }"
            >
              <template #item="{ item }">
                <div
                  class="w-full cursor-pointer rounded-md bg-gray-100 p-2 duration-200 hover:bg-gray-200"
                  @click.stop
                >
                  <n-ellipsis line-clamp="2" tooltip>
                    <template #tooltip>
                      <div class="w-[400px]">
                        <ais-highlight
                          attribute="title"
                          :hit="item"
                          highlighted-tag-name="mark"
                        />
                      </div>
                    </template>
                    <ais-highlight
                      attribute="title"
                      :hit="item"
                      highlighted-tag-name="mark"
                    />
                  </n-ellipsis>
                  <div>
                    <n-button
                      size="tiny"
                      secondary
                      type="primary"
                      class="text-primary"
                    >
                      <ais-snippet
                        attribute="venue"
                        :hit="item"
                        highlighted-tag-name="mark"
                      />
                    </n-button>
                  </div>
                </div>
              </template>
            </ais-hits>
            <ais-configure
              :attributes-to-snippet="['venue']"
              snippet-ellipsis-text="[…]"
            />
          </n-scrollbar>
          <div
            class="flex items-center border-t border-gray-300 px-4 py-3 text-blue-400"
          >
            <n-icon><arrow-enter-left24-regular /></n-icon>
            <span class="ml-2 mr-4 text-sm">to select</span>
            <n-icon><arrow-sort-down24-regular /></n-icon>
            <n-icon><arrow-sort-up24-regular /></n-icon>
            <span class="ml-2 text-sm">to navigate</span>
          </div>
        </div>
      </ais-instant-search>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import {
  NInput,
  NButton,
  NIcon,
  NModal,
  NScrollbar,
  NEllipsis,
} from "naive-ui";
import {
  Search48Filled,
  ArrowEnterLeft24Regular,
  ArrowSortUp24Regular,
  ArrowSortDown24Regular,
} from "@vicons/fluent";
import { Search } from "@vicons/ionicons5";
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { useSettingStore } from "@/store";
import { searchClient } from "@/search";
import "instantsearch.css/themes/satellite-min.css";
import {
  AisHits,
  AisSearchBox,
  AisHighlight,
  AisSnippet,
  AisInstantSearch,
  AisConfigure,
} from "vue-instantsearch/vue3/es";

const store = useSettingStore();
const mode = computed(() => store.mode);

const showSearch = ref(false);
const query = ref("");

watch(query, (value) => {
  console.log(value);
});

const width = ref(window.innerWidth);
const onResize = () => {
  width.value = window.innerWidth;
};
const onKeyDown = (e: any) => {
  if (e.key === "/" && !showSearch.value) {
    showSearch.value = true;
    e.preventDefault();
  }
};
onMounted(() => {
  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  window.removeEventListener("keydown", onKeyDown);
});
</script>

<style scoped lang="scss">
.app-button {
  padding: 1px 6px 1px 10px;
  border-radius: 10px;
  border-color: #e0e0e6;
  background-color: #f3f6f9;
  padding: 1px 6px 1px 10px;
  width: 200px;
  overflow: hidden;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: #e3e6e9;
  }
  &.dark {
    background-color: transparent;
    &:hover {
      background-color: #132f4c90;
    }
  }
  &.small {
    width: 34px;
    padding: 0;
    background-color: transparent;
  }
}
::v-deep(.hit-item) {
  padding: 4px 12px !important;
  box-shadow: none !important;
}
</style>
