<template>
  <div class="mb-6 flex flex-col md:flex-row">
    <div class="flex-grow">
      <h1 class="text-2xl font-bold">Jerry (Chi-Yuan) Chou 周志遠</h1>
      <div class="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-500">
        Associate Professor, Department of Computer Science, National Tsing Hua
        University
      </div>
      <div class="mt-3 text-base">
        Email:
        <a class="text-blue-400" href="mailto:jchou@lsalab.cs.nthu.edu.tw">
          jchou@lsalab.cs.nthu.edu.tw
        </a>
      </div>
      <div class="mt-3 text-base">
        Phone/Fax:
        <a class="text-blue-400" href="tel:+886-3-5742801">+886-3-5742801</a>
      </div>
      <div class="mt-3 text-base">
        <span>Office:</span>
        <span>
          Delta building 602<br />
          Department of Computer Science, National Tsing Hua University
        </span>
      </div>
      <div class="mt-3 text-base">
        Address:
        <a
          class="text-blue-400"
          href="http://maps.google.com/?q=No. 101, Sec. 2, Kuang-Fu Rd., Hsinchu, Taiwan 30013"
        >
          No. 101, Sec. 2, Kuang-Fu Rd., Hsinchu, Taiwan 30013
        </a>
      </div>
    </div>
    <div
      class="mt-4 flex h-[300px] flex-shrink-0 justify-center overflow-hidden rounded-md md:mt-0"
    >
      <n-image
        class="border border-gray-300"
        width="200"
        height="300"
        :src="Advisor"
        lazy
        object-fit="contain"
        fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </div>
  </div>
  <template v-for="(d, did) in data" :key="did">
    <div class="text-4xl">{{ d.title }}</div>
    <div class="ml-10">
      <li v-for="(event, eid) in d.children" :key="eid" class="my-2 text-base">
        {{ event }}
      </li>
    </div>
  </template>
</template>

<script setup lang="ts">
import { NImage } from "naive-ui";
import Advisor from "@/assets/advisor.jpeg";
const emits = defineEmits(["ready", "select"]);
emits("ready");

const data = [
  {
    title: "Education",
    children: [
      "Ph.D., Computer Science & Engineering, University of California at San Diego. (2004/8~2009/7)",
      "M.S., Computer Science, National Tsing Hua University. (2003/8~2004/7)",
      "B.S., Computer Science, National Tsing Hua University. (2000/8~2003/7)",
    ],
  },
  {
    title: "Research Interest",
    children: [
      "Distributed systems",
      "Cloud/Edge computing",
      "High Performance Computing",
      "Big Data, Storage Systems",
      "Resource management",
    ],
  },
  {
    title: "Services",
    children: [
      "清大計算機與通訊中心 網路組 副主任 2020/8/1-至今",
      "清大計算機與通訊中心 網路組 組長 2018/8/1-至今",
      "清大人工智慧製造系統研究中心(AIMS) 副主任 2019/2/1-至今",
      "自強工業科學基金會 人工智慧學院 院長 2020/8/1-至今",
      "企業顧問:自強工業科學基金會、雙子星雲端運算、AI Lab, Appier",
    ],
  },
  {
    title: "Honors",
    children: [
      "104年度電機資訊學院傑出教學獎",
      "106年度校傑出教學獎",
      "107科技部產學小聯盟績優聯盟獎",
      "Outstanding Paper Award, IEEE International Symposium on Cloud and Services Computing(SC2), 2017",
      "指導學生國際競賽: 2019亞洲學生超級電腦競賽總冠軍、 2018亞洲學生超級電腦競賽效能賽冠軍、2014美國學生叢集電腦效能賽冠軍",
      "指導學生國內競賽: 108年度大學部專題競賽優勝、 102年度大學部專題競賽佳作、103年度大專院校高效能桌面雲競賽冠軍",
    ],
  },
];
</script>
