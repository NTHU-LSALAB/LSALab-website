<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="flex flex-col lg:flex-row">
      <div class="min-w-[180px] flex-shrink-0">
        <n-menu
          :options="menuOptions"
          :class="{ lg: width >= 1024 }"
          :mode="width < 1024 ? 'horizontal' : 'vertical'"
          :default-value="name"
        />
        <div v-if="width >= 1024" class="mt-4">
          <div
            v-for="(layer, lid) in layers"
            :key="lid"
            class="mb-4 flex max-w-[250px] flex-wrap"
          >
            <n-image
              v-for="(img, iid) in layer"
              :key="iid"
              :width="250 / layer.length"
              :src="img"
              object-fit="contain"
            />
          </div>
        </div>
      </div>
      <div class="mt-4 mb-20 flex-grow lg:mt-0 lg:ml-4">
        <router-view @ready="onReady" @select="updateImage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/store";
import { NMenu, NImage } from "naive-ui";
import { computed, h, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, useRoute } from "vue-router";
const { t } = useI18n();
onMounted(() => {
  window.addEventListener("resize", onResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
const width = ref(window.innerWidth);
const onResize = () => {
  width.value = window.innerWidth;
};

const settingStore = useSettingStore();

settingStore.$subscribe(() => {
  menuOptions.value = createOptions();
});

const emits = defineEmits(["ready"]);
function onReady() {
  emits("ready");
}

const layers = ref<any[]>([]);
const updateImage = (imgs: any[]) => {
  layers.value = imgs;
};

const route = useRoute();
const name = computed(() => route.name?.toString());

function renderLink(label: string, name: string) {
  return () => h(RouterLink, { to: { name } }, { default: () => label });
}

const createOptions = () => [
  {
    label: renderLink(t("advisor.about"), "AdvisorAbout"),
    key: "AdvisorAbout",
  },
  {
    label: renderLink(t("advisor.sketch"), "AdvisorBio"),
    key: "AdvisorBio",
  },
  {
    label: renderLink(t("advisor.pub"), "AdvisorPub"),
    key: "AdvisorPub",
  },
  {
    label: renderLink(t("advisor.teaching"), "AdvisorTeaching"),
    key: "AdvisorTeaching",
  },
  {
    label: renderLink(t("advisor.cv"), "AdvisorCV"),
    key: "AdvisorCV",
  },
];
const menuOptions = ref(createOptions());
</script>

<style scoped lang="scss">
::v-deep(.n-menu-item-content)::after {
  content: "";
  position: absolute;
  width: 80%;
  height: 4px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #007fff;
  // background-color: #0e6ba8;
  opacity: 0;
  transition: opacity 0.3s;
}
.lg ::v-deep(.n-menu-item-content) {
  &::after {
    width: 4px;
    height: 100%;
    top: 0;
    left: 8px;
    transform: none;
  }
}
::v-deep(.n-menu-item--selected) {
  .n-menu-item-content::after {
    opacity: 1 var(--n-bezier);
  }
}
</style>
