<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="text-2xl font-bold">{{ t("nav.competition") }}</div>
    <n-tabs
      class="mt-4"
      type="segment"
      :value="tab"
      @update-value="tab = $event"
    >
      <n-tab-pane name="#scc" :tab="t('competition.scc')">
        <ul class="ml-8 list-disc text-base">
          <li class="text-lg">{{ t("competition.intro") }}</li>
          <div class="mt-2">
            High-performance computing and artificial intelligence are the most
            essential tools fueling the advancement of science. In order to
            handle the ever-growing demands for higher computation performance
            and the increase in the complexity of research problems, the world
            of scientific computing continues to re-innovate itself in a fast
            pace.
          </div>
          <li class="mt-4 text-lg">{{ t("competition.way") }}</li>
          <li class="mt-4 text-lg">{{ t("competition.recruit") }}</li>
          <li class="mt-4 text-lg">{{ t("competition.info") }}</li>
          <ul class="list-[circle] sm:ml-4 md:ml-8">
            <li class="mt-2 font-bold text-primary">
              <a
                class="hover:underline"
                href="https://www.hpcadvisorycouncil.com/events/student-cluster-competition/"
                target="_blank"
              >
                Student Cluster Competition (SCC)
              </a>
            </li>
            <!-- <li>TSCC</li> -->
            <li class="mt-2 font-bold text-primary">
              <a
                class="hover:underline"
                href="http://www.asc-events.org/ASC20-21/Trainingcamp.php"
                target="_blank"
              >
                ASC Student Supercomputer Challenge
              </a>
            </li>
            <li class="mt-2 font-bold text-primary">
              <a
                class="hover:underline"
                href="https://www.isc-hpc.com/student-cluster-competition.html"
                target="_blank"
              >
                ISC 2022 STUDENT CLUSTER COMPETITION
              </a>
            </li>
          </ul>
          <li class="mt-4 text-lg">{{ t("competition.history") }}</li>
          <n-data-table
            class="mt-4"
            :columns="headers"
            :data="data"
            :pagination="pagination"
            scroll-x="1000"
          />
          <li class="mt-4 text-lg">{{ t("competition.news") }}</li>
          <ul class="mt-4 list-[circle] sm:ml-4 md:ml-8">
            <li class="font-bold text-primary">
              <a
                class="hover:underline"
                href="https://nthu-en.site.nthu.edu.tw/p/406-1003-211479,r8773.php"
                target="_blank"
              >
                NTHU Team Steals the Show at the ASC Student Supercomputer
                Challenge
              </a>
            </li>
            <li class="mt-2 font-bold text-primary">
              <a
                class="hover:underline"
                href="https://dcs.site.nthu.edu.tw/p/404-1174-193149.php?fbclid=IwAR1FaO02Ojf5xcS4JYWldUx5fgJUI3avQ6rK5JED3FKjNrERJKrXSBu7I8M"
                target="_blank"
              >
                賀!資工系王子文等7位同學榮獲2020 APAC HPC-AI Competition Second
                Prize (指導教授:周志遠教授)
              </a>
            </li>
            <!-- <li>採訪</li>
            <li>新聞</li>
            <li>照片</li> -->
          </ul>
        </ul>
      </n-tab-pane>
      <n-tab-pane name="#project" :tab="t('competition.project')">
        <ul class="ml-8 list-disc text-base">
          <li class="text-lg">{{ t("competition.intro") }}</li>
          <ul class="ml-8 list-[circle]">
            <li>2022</li>
          </ul>
          <li class="text-lg">{{ t("competition.way") }}</li>
          <li class="text-lg">{{ t("competition.history") }}</li>
          <ul class="ml-8 list-[circle]">
            <li>2021 ...</li>
            <li>2020 ...</li>
            <li>2013 An Automatic Cloud OS</li>
            <li>2013 Face detective</li>
            <li>2012 What Should we Concern for Using Cloud Technology</li>
          </ul>
        </ul>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { NTabs, NTabPane, NDataTable } from "naive-ui";
import { TableColumn } from "naive-ui/lib/data-table/src/interface";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
const emits = defineEmits(["ready"]);
emits("ready");
const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const tab = ref("#scc");
const updateTab = () => {
  const hash = route.hash;
  tab.value = hash || "#scc";
};
onMounted(updateTab);
watch(tab, (value) => {
  console.log(value);
  if (route.hash !== value) {
    router.push({ hash: tab.value }).then(() => emits("ready"));
  }
});

const data = [
  {
    key: 0,
    date: "2020-2021",
    name: "ASC Student Supercomputer Challenge",
    location: "Virtual",
    members: [
      "王子文",
      "黃文遠",
      "蕭亦程",
      "牟展祐",
      "蔣立元",
      "張承勳",
      "林恩德",
    ],
    place: "1st",
  },
  {
    key: 1,
    date: "2020",
    name: "APAC HPC-AI Competition",
    location: "Virtual",
    members: [
      "王子文",
      "黃文遠",
      "蕭亦程",
      "牟展祐",
      "蔣立元",
      "張承勳",
      "林恩德",
    ],
    place: "2nd",
  },
  // {
  //   key: 2,
  //   date: "2017.10.12",
  //   name: "Compeition3",
  //   location: "NTHU",
  //   members: ["nice", "developer"],
  //   place: "1st",
  // },
];
const headers: TableColumn<any>[] = [
  {
    title: "日期",
    key: "date",
    width: 110,
  },
  {
    title: "賽事名稱",
    key: "name",
  },
  {
    title: "地點",
    key: "location",
  },
  {
    title: "成員",
    key: "members",
    render(row, index) {
      return row.members.join("、");
    },
  },
  {
    title: "名次",
    key: "place",
    width: 80,
  },
];

const pagination = {
  pageSize: 10,
};
</script>
