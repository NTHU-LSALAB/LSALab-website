<template>
  <div>
    <n-popover trigger="hover">
      <template #trigger>
        <n-button
          size="medium"
          style="padding: 0 8px; border-radius: 10px"
          secondary
          type="primary"
        >
          <template #icon>
            <n-icon>
              <language-filled />
            </n-icon>
          </template>
          {{ langShort }}
        </n-button>
      </template>
      <div class="w-18">
        <n-button
          class="w-full"
          block
          style="justify-content: left; padding: 0 4px"
          v-for="lang in languages"
          :bordered="false"
          @click="changeLang(lang.tag)"
          :style="{ color: selectedLang === lang ? '#007FFF' : '' }"
        >
          <template #icon>
            <n-icon><check-round v-if="selectedLang === lang" /></n-icon>
          </template>
          {{ lang.text }}
        </n-button>
      </div>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/store";
import { NButton, NPopover, NIcon } from "naive-ui";
import { LanguageFilled, CheckRound } from "@vicons/material";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });
const settingStore = useSettingStore();

const languages = [
  {
    text: "English",
    short: "EN",
    tag: "en",
  },
  {
    text: "繁體中文",
    short: "TW",
    tag: "zh",
  },
];

const changeLang = (lang: string) => {
  locale.value = lang;
  settingStore.updateLocale(lang);
};

const selectedLang = computed(() =>
  languages.find((lang) => lang.tag === locale.value)
);

const langShort = computed(
  () => languages.find((lang) => lang.tag === locale.value)?.short
);
</script>
