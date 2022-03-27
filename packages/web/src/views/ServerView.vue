<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="text-2xl font-bold">{{ t("page.server") }}</div>
    <n-carousel
      draggable
      class="mt-4 rounded-md bg-gray-100 p-2 dark:bg-gray-600"
      slides-per-view="auto"
      :space-between="20"
      :loop="false"
      :show-dots="false"
      show-arrow
    >
      <n-carousel-item v-for="info in basicInfos" style="width: fit-content">
        <n-card size="small">
          <div>{{ info.type }}</div>
          <div>{{ info.usage }}</div>
          <div class="flex">
            <div v-for="server in info.servers">
              <div class="h-44 overflow-hidden">
                <n-image :src="server.image" width="150" object-fit="contain" />
              </div>
              <div>{{ server.name }}</div>
            </div>
          </div>
        </n-card>
      </n-carousel-item>
      <template #arrow="{ prev, next }">
        <div class="absolute bottom-1 right-1">
          <n-button text type="primary" class="!mr-2" @click="prev">
            <n-icon size="20"><arrow-back /></n-icon>
          </n-button>
          <n-button text type="primary" @click="next">
            <n-icon size="20"><arrow-forward /></n-icon>
          </n-button>
        </div>
      </template>
    </n-carousel>
    <div class="mt-8 text-xl font-bold">{{ t("server.basic") }}</div>
    <n-data-table
      class="mt-4 h-[400px]"
      :data="servers"
      :columns="headers"
      :single-line="false"
      :scroll-x="1000"
      flex-height
    />
    <div class="mt-8 text-xl font-bold">{{ t("server.hardware") }}</div>
    <n-data-table
      class="mt-4 h-[400px]"
      :data="hardwares"
      :columns="hardwareHeaders"
      :pagination="pagination"
      :single-line="false"
      :scroll-x="1000"
      flex-height
    />
  </div>
</template>

<script setup lang="ts">
import { renderHref } from "@/utils/component";
import { NDataTable } from "naive-ui";
import {
  NCarousel,
  NCarouselItem,
  NImage,
  NCard,
  NButton,
  NIcon,
} from "naive-ui";
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { TableColumn } from "naive-ui/lib/data-table/src/interface";
import { useI18n } from "vue-i18n";
import Zeus from "@/assets/servers/zeus.png";
import Apollo from "@/assets/servers/apollo.png";
import Artemis from "@/assets/servers/artemis.png";
import Cupid from "@/assets/servers/cupid.png";
import Juno from "@/assets/servers/juno.png";
import Hades from "@/assets/servers/hades.png";
import Hera from "@/assets/servers/hera.png";
import Gaia from "@/assets/servers/gaia.png";
import Athena from "@/assets/servers/athena.png";
import { reactive } from "vue";
const emits = defineEmits(["ready"]);
emits("ready");
const { t } = useI18n();

const basicInfos = reactive([
  {
    type: "CPU/GPU伺服器",
    usage: "實驗室主機",
    servers: [
      {
        name: "Zeus",
        image: Zeus,
      },
    ],
  },
  {
    type: "CPU伺服器",
    usage: "課程與研究",
    servers: [
      {
        name: "Apollo",
        image: Apollo,
      },
    ],
  },
  {
    type: "GPU伺服器",
    usage: "比賽專用",
    servers: [
      {
        name: "Artemis",
        image: Artemis,
      },
    ],
  },
  {
    type: "GPU個人主機",
    usage: "測試開發",
    servers: [
      {
        name: "Cupid",
        image: Cupid,
      },
      {
        name: "Juno",
        image: Juno,
      },
    ],
  },
  {
    type: "GPU個人主機",
    usage: "課程與計畫共用",
    servers: [
      {
        name: "Hades",
        image: Hades,
      },
    ],
  },
  {
    type: "CPU伺服器",
    usage: "測試與備用機",
    servers: [
      {
        name: "Hera",
        image: Hera,
      },
      {
        name: "Gaia",
        image: Gaia,
      },
      {
        name: "Athena",
        image: Athena,
      },
    ],
  },
]);

const headers: TableColumn<any>[] = [
  {
    title: "系統名稱",
    key: "name",
    rowSpan: (rowData) => rowData.rowSpanSetting?.name ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.name ?? 1,
  },
  {
    title: "購買年份",
    key: "year",
    rowSpan: (rowData) => rowData.rowSpanSetting?.year ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.year ?? 1,
  },
  {
    title: "數量",
    key: "ammount",
    rowSpan: (rowData) => rowData.rowSpanSetting?.ammount ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.ammount ?? 1,
  },
  {
    title: "擺放位置",
    key: "loc",
    rowSpan: (rowData) => rowData.rowSpanSetting?.loc ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.loc ?? 1,
  },
  {
    title: "用途",
    key: "usage",
    rowSpan: (rowData) => rowData.rowSpanSetting?.usage ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.usage ?? 1,
  },
  {
    title: "管理者",
    key: "manager",
    rowSpan: (rowData) => rowData.rowSpanSetting?.manager ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.manager ?? 1,
  },
  {
    title: "使用資訊",
    key: "info",
    rowSpan: (rowData) => rowData.rowSpanSetting?.info ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.info ?? 1,
  },
];

const servers = [
  {
    key: 0,
    rowSpanSetting: {
      name: 5,
      ammount: 5,
      loc: 5,
    },
    name: "Apollo",
    ammount: 60,
    loc: "資電325",
    usage: "02~10 外借",
    manager: "鍾老師",
  },
  {
    key: 1,
    usage: "27~30 Openstack共用測試平台",
    manager: "Aiden",
    info: "IP: 使用手冊 系統狀態",
  },
  {
    key: 2,
    usage: "31~50 平程課程平台",
    manager: renderHref("課程助教", "mailto:pp@lsalab.cs.nthu.edu.tw"),
    info: "IP: 使用手冊 系統狀態",
  },
  {
    key: 3,
    usage: "其餘為暫用測試",
    manager: "系統管理員(恩德)",
    info: renderHref("使用現況", ""),
  },
  {
    key: 4,
    usage: "併入Openstack共用測試平台",
  },
  {
    key: 5,
    rowSpanSetting: {
      name: 3,
      usage: 3,
      manager: 3,
      info: 3,
    },
    name: "Zeus",
    ammount: 1,
    usage: "實驗室網頁、使用者測試、程式開發",
    manager: "系統管理員(恩德)",
    info: renderHref("使用現況", ""),
  },
  {
    key: 6,
    ammount: 6,
  },
  {
    key: 7,
    ammount: 1,
  },
  {
    key: 8,
    name: "art",
    ammount: 2,
    usage: "SCC比賽",
    info: renderHref("系統狀態", ""),
  },
  {
    key: 9,
    name: "Artemis",
    ammount: 2,
    usage: "SCC比賽",
    info: renderHref("系統狀態", ""),
  },
  {
    key: 10,
    name: "Hades",
    ammount: 1,
  },
  {
    key: 11,
    name: "Cupid",
  },
  {
    key: 12,
    name: "Juno",
  },
];

const hardwareHeaders: TableColumn<any>[] = [
  {
    title: "系統名稱",
    key: "name",
    rowSpan: (rowData) => rowData.rowSpanSetting?.name ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.name ?? 1,
  },
  {
    title: "製造商",
    key: "manufacturer",
    rowSpan: (rowData) => rowData.rowSpanSetting?.manufacturer ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.manufacturer ?? 1,
  },
  {
    title: "型號",
    key: "model",
    rowSpan: (rowData) => rowData.rowSpanSetting?.model ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.model ?? 1,
  },
  {
    title: "CPU(Model/#Cores)",
    key: "cpu",
    rowSpan: (rowData) => rowData.rowSpanSetting?.cpu ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.cpu ?? 1,
  },
  {
    title: "Memory(GB)",
    key: "memory",
    rowSpan: (rowData) => rowData.rowSpanSetting?.memory ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.memory ?? 1,
  },
  {
    title: "Storage",
    key: "storage",
    rowSpan: (rowData) => rowData.rowSpanSetting?.storage ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.storage ?? 1,
  },
  {
    title: "GPU",
    key: "gpu",
    rowSpan: (rowData) => rowData.rowSpanSetting?.gpu ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.gpu ?? 1,
  },
  {
    title: "網路",
    key: "network",
    rowSpan: (rowData) => rowData.rowSpanSetting?.network ?? 1,
    colSpan: (rowData) => rowData.colSpanSetting?.network ?? 1,
  },
];

const hardwares = [
  {
    key: 0,
    rowSpanSetting: {
      name: 2,
    },
    name: "Apollo",
    manufacturer: "廣達",
  },
  {
    key: 1,
    manufacturer: "超微",
    model: "SYS-2027GR-TRF",
    cpu: "",
    memory: "128",
    storage: "",
    gpu: "",
    network: "",
  },
  {
    key: 2,
    rowSpanSetting: {
      name: 3,
      manufacturer: 3,
    },
    name: "Zeus",
    manufacturer: "Tyan",
    model: "TP26B7002",
    cpu: "2 X Intel ES620 / 4",
    memory: "32",
    storage: "2TB x 8",
    gpu: "",
    network: "",
  },
  {
    key: 3,
    model: "TP26B8236",
    cpu: "AMD 6282 / 16",
    memory: "64",
    storage: "2TB HDD, 256GB SSD",
    gpu: "",
    network: "",
  },
  {
    key: 4,
    model: "TN77B7061W8HR",
    cpu: "2 X Intel E5-2670 V2 / 10",
    memory: "128",
    storage: "1TB HDD, 256GB SSD",
    gpu: "2 x K20",
    network: "",
  },
];

const pagination = {
  pageSize: 10,
};
</script>
