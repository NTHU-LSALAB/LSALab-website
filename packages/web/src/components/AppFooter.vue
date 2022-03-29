<template>
  <div class="flex flex-col bg-gray-100 dark:bg-black">
    <div class="grid flex-grow gap-4 pt-8 pb-5 md:grid-cols-4">
      <div class="flex items-start justify-center">
        <img class="w-24" :src="Logo" />
      </div>
      <div class="text-center md:text-left">
        <div class="text-xl font-bold tracking-wide text-gray-600">
          {{ t("footer.info") }}
        </div>
        <div class="mt-2 text-base font-bold text-gray-600 md:mt-6">
          Jerry Chou
        </div>
        <div class="font-bold text-gray-400">
          Department of Computer Science, NTHU
        </div>
        <div class="mt-2 text-base font-bold text-gray-600 md:mt-6">
          {{ t("footer.location") }}
        </div>
        <div class="font-bold text-gray-400">Room 835/836, EECS Building</div>
        <div class="mt-2 text-base font-bold text-gray-600 md:mt-6">
          {{ t("footer.phone") }}
        </div>
        <div class="font-bold text-gray-400">+886-3-5715131 (ext. 33538)</div>
      </div>
      <div class="text-center md:text-left">
        <div class="text-xl font-bold tracking-wide text-gray-600">
          {{ t("footer.link") }}
        </div>
        <div class="mt-2 font-bold text-gray-600 underline md:mt-6">
          <a href="https://www.nthu.edu.tw/">清華大學</a>
        </div>
        <div class="mt-2 font-bold text-gray-600 underline md:mt-4">
          <a href="http://web.cs.nthu.edu.tw/">清華大學資工所</a>
        </div>
        <!-- <div class="mt-2 font-bold text-gray-600 underline md:mt-4">
          <a href="https://lsalab.cs.nthu.edu.tw/acts_alliance/home/"
            >雲運算技術與服務產學聯盟</a
          >
        </div> -->
      </div>
      <div
        class="flex flex-col items-center text-center md:items-start md:text-left"
      >
        <div class="text-xl font-bold tracking-wide text-gray-600">
          {{ t("footer.contact") }}
        </div>
        <div class="contact max-w-[300px] md:max-w-[200px] md:pr-2">
          <contact-form />
        </div>
      </div>
    </div>
    <div class="flex justify-center pb-1 text-gray-500">
      <router-link class="mx-1" to="/article/lsalab-privacy-policy">
        Privacy
      </router-link>
      <router-link class="mx-1" to="/article/lsalab-terms-of-service">
        Terms
      </router-link>
    </div>
    <div
      class="flex flex-shrink-0 items-center justify-center border-t border-gray-400 py-2 text-xs text-gray-500"
    >
      @ 2022 Copyright: <span class="font-bold">LSA Lab@NTHU</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.png";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import ContactForm from "@/components/ContactForm.vue";
const { t } = useI18n();
</script>
