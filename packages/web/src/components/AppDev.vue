<template>
  <div
    ref="boxRef"
    class="fixed bottom-3 left-3 z-10 w-72 rounded-md bg-amber-200 py-2 px-4 opacity-95 shadow-5 dark:bg-black dark:text-amber-200"
  >
    <div class="text-lg font-bold">{{ t("dev.note") }}</div>
    {{ t("dev.content") }}
    <div class="flex justify-end">
      <n-button type="warning" text-color="black" @click="close">
        {{ t("dev.action") }}
      </n-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from "gsap";
import { NButton } from "naive-ui";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const boxRef = ref<HTMLDivElement | null>(null);
const close = () => {
  closeTL.play();
};
const closeTL = gsap.timeline();
onMounted(() => {
  closeTL
    .to(boxRef.value, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        if (boxRef.value) boxRef.value.style.display = "hidden";
      },
    })
    .pause();
});
</script>
