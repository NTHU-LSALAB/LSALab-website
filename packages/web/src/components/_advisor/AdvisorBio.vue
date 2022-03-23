<template>
  <div class="text-2xl font-bold">{{ t("advisor.sketch") }}</div>
  <div class="mt-4 text-base">
    <div class="text-justify">
      <span class="ml-10">Dr</span>. Jerry (Chi-Yuan) Chou received M.S./B.S.
      degrees from Department of Computer Science at National Tsing Hua
      University(NTHU) in 2003/2004, and the Ph.D. degree from the
      <a href="https://cse.ucsd.edu/">
        Department of Computer Science and Engineering at University of San
        Diego(UCSD)
      </a>
      , USA in 2009. Dr. Chou joined the
      <a href="http://web.cs.nthu.edu.tw/">
        Department of Computer Science at National Tsing Hua University
      </a>
      in 2011 as an Assistant Professor, and was promoted to an Associate
      Professor in 2016. Between 2010 and 2011, Dr. Chou was a member of
      <a href="https://sdm.lbl.gov/">scientific data management group</a> in
      <a href="https://www.lbl.gov/">Lawrence Berkeley National Lab (LBNL)</a>.
    </div>
    <div class="mt-4 text-justify">
      <span class="ml-10">Dr</span>. Chou’s research interests are in the broad
      area of distributed systems including high performance computing,
      cloud/edge computing, big data, storage systems, and resource or data
      management. In recent years, Dr. Chou is more focus on the topic of
      developing systems for AI and also applying AI in systems. His work has
      led dozens of
      <span><router-link to="/pub">publication</router-link></span> in
      prestigious international journals and conferences including IEEE
      Transactions on Distributed and Parallel Systems (TPDS), Journal of
      Parallel and Distributed Computing (JPDC), IEEE/ACM Supercomputing,
      IEEE/ACM High-Performance Parallel and Distributed Computing (HPDC), IEEE
      Cluster, etc. He also received a best paper award from International
      Symposium on Cloud and Service Computing, and served as committee members
      and organizers in various conferences, including CloudCom’12, ICDCS’13,
      ICPADS’14, CLUSTER’14, SNTA workshop’19, AII workshop’19.
    </div>
    <div class="mt-4 text-justify">
      <span class="ml-10">Dr</span>. Chou is dedicated to extend his research to
      industry. In 2016, he found the
      <span>Alliance of Cloud Technology and Services (ACTS)</span> with the
      support from MOST(Ministry of Science and Technology). The mission of the
      alliance is to provide a platform for connecting industry and academia by
      organizing and supporting various events or activities, such as workshop,
      campus recruitment, exhibition and competition. Currently, more than 30
      companies and 10 professors have become the members of the alliance. Dr.
      Chou also has several on-going <span>project collaborations</span> with
      companies or research institutions, and serves as consultants.
    </div>
    <div class="mt-4 text-justify">
      <span class="ml-10">Dr</span>. Chou also has strong passions for teaching
      and education. He received the <span>Excellent Teaching Awards</span> from
      the EECS college and NTHU school in 2015 and 2017, respectively. Since Dr.
      Chou joined NTHU, he has been training undergraduate students to
      participate the
      <a href="https://www.hpcadvisorycouncil.com/competition.php"
        >international student cluster competitions</a
      >
      organized by the HPC advisory council, and won many prizes including
      overall winner in ASC2019, highest Linpack in ASC’18, SC’14, and runner-up
      in SC’19, SC’17, SC’15, ASC’13, SC’12.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emits = defineEmits(["ready", "select"]);
emits("ready");
</script>

<style scoped lang="scss">
a {
  color: #007fff;
  // color: #0e6ba8;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
}
</style>
