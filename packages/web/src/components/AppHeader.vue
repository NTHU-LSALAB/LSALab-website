<template>
  <div
    class="border-gray fixed z-10 h-20 w-full border-b bg-[#FFFFFF90] backdrop-blur dark:border-none dark:bg-[#00000090]"
    ref="header"
  >
    <div
      class="mx-auto flex h-full items-center justify-between px-4 sm:w-4/5 sm:px-0"
    >
      <div class="flex items-center">
        <template v-if="width < 1024">
          <app-hamburger class="mr-2" v-model="tab" :options="options" />
        </template>
        <span
          class="cursor-pointer text-2xl font-bold"
          @click="router.push('/')"
        >
          LSA<span v-if="width >= 420">-Lab</span>
        </span>
        <n-menu
          v-if="width >= 1024"
          v-model:value="tab"
          class="menu ml-4"
          mode="horizontal"
          :options="options"
        />
      </div>
      <div class="flex items-center">
        <app-search class="ml-2" />
        <app-locale-button class="ml-2" />
        <github-button class="ml-2" />
        <mode-switch class="ml-2" />
        <app-auth-button class="ml-2" v-if="width >= 1024" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  Album24Regular,
  CalendarLtr20Regular,
  Code24Filled,
  People28Regular,
  WindowMultiple20Regular,
} from "@vicons/fluent";
import { SchoolOutline } from "@vicons/ionicons5";
import {
  AccountCircleOutlined,
  ConnectWithoutContactOutlined,
  EmojiEventsOutlined,
  EmojiPeopleOutlined,
  GradeOutlined,
  SourceOutlined,
  LibraryBooksOutlined,
} from "@vicons/material";
import { CloudServerOutlined } from "@vicons/antd";
import { Workspace } from "@vicons/carbon";
import { NMenu } from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import { renderHref, renderIcon, renderLink } from "@/utils/component";
import { useI18n } from "vue-i18n";
import ModeSwitch from "@/components/ModeSwitch.vue";
import AppLocaleButton from "@/components/AppLocaleButton.vue";
import AppAuthButton from "@/components/AppAuthButton.vue";
import { useSettingStore } from "@/store";
import GithubButton from "@/components/GithubButton.vue";
import AppHamburger from "@/components/AppHamburger.vue";
import AppSearch from "@/components/AppSearch.vue";

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
const { t } = useI18n();

settingStore.$subscribe(() => {
  options.value = createOptions();
});

const width = ref(window.innerWidth);
const onResize = () => {
  width.value = window.innerWidth;
};
const tab = computed({
  get: () => {
    const name = route.name?.toString();
    if (name?.startsWith("Advisor")) return "Advisor";
    else if (name?.startsWith("Resource")) return "Resource";
    else return name;
  },
  set: () => {},
});

const header = ref(null);
const idleTime = ref(-1);
onMounted(() => {
  window.addEventListener("resize", onResize);
  const showAnim = gsap
    .from(header.value, {
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: "power4.inOut",
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 999999,
    onUpdate: () => {
      showAnim.reverse();
      idleTime.value = 4;
    },
    // markers: true,
  });

  setInterval(() => {
    idleTime.value--;
    if (idleTime.value == 0) {
      showAnim.play();
    }
  }, 50);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
const createOptions = () => [
  {
    label: t("nav.members"),
    key: "member",
    icon: renderIcon(People28Regular),
    children: [
      {
        label: renderLink(t("nav.advisor"), "AdvisorAbout"),
        key: "Advisor",
        icon: renderIcon(AccountCircleOutlined),
      },
      {
        label: renderLink(t("nav.student"), "StudentView"),
        key: "StudentView",
        icon: renderIcon(EmojiPeopleOutlined),
      },
    ],
  },
  {
    label: t("nav.research"),
    key: "research",
    icon: renderIcon(Workspace),
    children: [
      {
        label: renderLink(t("nav.field"), "ResearchView"),
        key: "ResearchView",
        icon: renderIcon(SchoolOutline),
      },
      {
        label: renderLink(t("nav.pub"), "PublicationView"),
        key: "PublicationView",
        icon: renderIcon(LibraryBooksOutlined),
      },
    ],
  },
  {
    label: t("nav.achievement"),
    key: "achievement",
    icon: renderIcon(GradeOutlined),
    children: [
      {
        label: renderLink(t("nav.competition"), "CompetitionView"),
        key: "CompetitionView",
        icon: renderIcon(EmojiEventsOutlined),
      },
      {
        label: () =>
          renderHref(t("nav.software"), "https://github.com/orgs/NTHU-LSALAB/"),
        key: "software",
        icon: renderIcon(Code24Filled),
      },
    ],
  },
  {
    label: t("nav.other"),
    key: "others",
    icon: renderIcon(WindowMultiple20Regular),
    children: [
      {
        label: renderLink(t("nav.server"), "ServerView"),
        key: "ServerView",
        icon: renderIcon(CloudServerOutlined),
      },
      {
        label: renderLink(t("nav.connection"), "ConnectionView"),
        key: "ConnectionView",
        icon: renderIcon(ConnectWithoutContactOutlined),
      },
      {
        label: renderLink(t("nav.calendar"), "CalendarView"),
        key: "CalendarView",
        icon: renderIcon(CalendarLtr20Regular),
      },
      {
        label: renderLink(t("nav.album"), "AlbumView"),
        key: "AlbumView",
        icon: renderIcon(Album24Regular),
      },
      {
        label: renderLink(t("nav.resource"), "ResourceView"),
        key: "Resource",
        icon: renderIcon(SourceOutlined),
      },
    ],
  },
];
const options = ref(createOptions());
</script>

<style scoped lang="scss">
.menu ::v-deep(.n-menu-item-content) {
  padding: 0 8px !important;
}
</style>
