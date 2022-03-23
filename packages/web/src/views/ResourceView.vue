<template>
  <div class="mx-auto px-4 pt-10 sm:w-4/5 sm:px-0">
    <div class="text-2xl font-bold">{{ t("nav.resource") }}</div>
    <n-menu
      class="mt-4"
      :value="null"
      :options="menuOptions"
      :default-expanded-keys="defaultExpandedKeys"
    />
  </div>
</template>

<script setup lang="ts">
import { NMenu } from "naive-ui";
import {
  Folder48Regular,
  AppsList24Regular,
  Document20Regular,
  Link28Regular,
} from "@vicons/fluent";
import { renderIcon, renderLink } from "@/utils/component";
import { useI18n } from "vue-i18n";

const emits = defineEmits(["ready"]);
emits("ready");
const { t } = useI18n();
const defaultExpandedKeys = ["document", "note"];

const menuOptions = [
  {
    label: "Documents",
    key: "document",
    children: [
      {
        label: renderLink("Group Meeting", "Resource/GroupMeetingView"),
        key: "group-meeting",
        icon: renderIcon(Folder48Regular),
      },
      {
        label: renderLink(
          "Journal/Conference list",
          "Resource/JournalListView"
        ),
        key: "journal/conference",
        icon: renderIcon(AppsList24Regular),
      },
      // {
      //   label: "Others",
      //   key: "others",
      //   icon: renderIcon(Folder48Regular),
      //   disabled: true,
      // },
    ],
  },
  {
    label: "Notes",
    key: "note",
    children: [
      {
        label: renderLink("Lab101", {
          name: "ArticleView",
          params: {
            articleName: "wiki",
          },
        }),
        key: "lab101",
        icon: renderIcon(Document20Regular),
      },
      {
        label: renderLink("Related Links", "Resource/RelatedLinksView"),
        key: "related-links",
        icon: renderIcon(Link28Regular),
      },
    ],
  },
];
</script>
