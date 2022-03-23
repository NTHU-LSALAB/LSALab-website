<template>
  <div
    class="mt-4 w-2 bg-gray-200 py-10 font-bold text-primary shadow-app"
    ref="headerRef"
  >
    <h1 class="mx-auto px-4 text-4xl sm:w-4/5 sm:px-0">
      <span class="" ref="textRef"></span>
      <span class="" ref="cursorRef">_</span>
    </h1>
  </div>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <!-- Welcome Text -->
    <h1 class="text-2xl font-bold">
      {{ t("home.welcome.title") }}
    </h1>
    <i18n-t
      class="mt-4 text-lg"
      keypath="home.welcome.text"
      tag="div"
      scope="global"
    >
      <template #prof>
        <router-link to="/member/advisor">
          <span>{{ t("home.welcome.prof") }}</span>
        </router-link>
      </template>
      <template #dist>
        <router-link to="/research">
          <span>{{ t("home.welcome.dist") }}</span>
        </router-link>
      </template>
      <template #collaboration>
        <router-link to="/connection">
          <span>{{ t("home.welcome.collaboration") }}</span>
        </router-link>
      </template>
      <template #paper>
        <router-link to="/pub">
          <span>{{ t("home.welcome.paper") }}</span>
        </router-link>
      </template>
      <template #repo>
        <span>
          <a href="https://github.com/NTHU-LSALAB" target="_blank">
            {{ t("home.welcome.repo") }}
          </a>
        </span>
      </template>
    </i18n-t>
    <!-- Prospective students -->
    <h1 class="mt-8 text-2xl font-bold">
      {{ t("home.student.title") }}
    </h1>
    <div class="mt-4 text-lg">
      <ul class="app-list list-inside">
        <i18n-t
          :keypath="`home.student.items[${i - 1}].text`"
          tag="li"
          v-for="i in 3"
          scope="global"
        >
          <template #children>
            <ul class="ml-10 list-inside">
              <li v-for="j in 5">
                {{ t(`home.student.items[0].items[${j - 1}]`) }}
              </li>
            </ul>
          </template>
          <template #software>
            <span>
              <a
                class="color-[#2e49c0] hover:underline"
                href="https://github.com/NTHU-LSALAB"
                target="_blank"
              >
                {{ t("home.student.software") }}
              </a>
            </span>
          </template>
          <template #research>
            <router-link to="/research">
              {{ t("home.student.research") }}
            </router-link>
          </template>
          <template #competition>
            <router-link :to="{ path: '/competition', hash: '#scc' }">
              {{ t("home.student.competition") }}
            </router-link>
          </template>
          <template #project>
            <router-link :to="{ path: '/competition', hash: '#project' }">
              {{ t("home.student.project") }}
            </router-link>
          </template>
          <template #email>
            <span>
              <a href="mailto:jchou@lsalab.cs.nthu.edu.tw">{{
                t("home.student.email")
              }}</a>
            </span>
          </template>
        </i18n-t>
      </ul>

      <div class="mt-10 flex flex-wrap justify-center">
        <a
          class="mx-5 h-[90px]"
          :href="logo.url"
          target="_blank"
          v-for="(logo, i) in logos"
          :key="i"
        >
          <img class="h-full" :src="logo.img" />
        </a>
      </div>
    </div>
    <h1 class="mt-8 text-2xl font-bold">
      {{ t("home.news.title") }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import docker from "@/assets/logos/docker.png";
import kubernetes from "@/assets/logos/kubernetes.png";
import cuda from "@/assets/logos/cuda.png";
import aws from "@/assets/logos/aws.png";
import linux from "@/assets/logos/linux.png";
import { onMounted, ref, watch } from "vue";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useI18n } from "vue-i18n";
import { useCachedRequest } from "@/composables/useCachedRequest";
const emits = defineEmits(["ready"]);
const { t } = useI18n();

// text animation
const cursorRef = ref(null);
const headerRef = ref(null);
const textRef = ref(null);
gsap.registerPlugin(TextPlugin);
const { item: status } =
  useCachedRequest<{ attributes: { welcomeTexts: string[] } }>("status");
const headerTL = gsap.timeline().pause();
const masterTL = gsap
  .timeline({
    onComplete: () => {
      headerTL.reverse();
    },
  })
  .pause();
onMounted(() => {
  gsap.to(cursorRef.value, { opacity: 0, ease: "power2.inOut", repeat: -1 });
  headerTL
    .from(headerRef.value, {
      opacity: 0,
      height: 0,
      duration: 0.4,
      padding: 0,
      margin: 0,
      ease: "power4.inOut",
      delay: 1,
    })
    .to(headerRef.value, {
      width: "100%",
      x: 0,
      duration: 0.4,
      ease: "power4.inOut",
      onComplete: () => {
        masterTL.play();
      },
    });
  emits("ready");
});

watch(status, (value) => {
  const words = value?.attributes.welcomeTexts;
  if (words) {
    masterTL.clear(true);
    words.forEach((word) => {
      let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
      tl.to(textRef.value, { duration: word.length * 0.05, text: word });
      masterTL.add(tl);
    });
    headerTL.progress(0).play();
  }
});

const logos = [
  {
    img: docker,
    url: "https://www.docker.com/",
  },
  {
    img: kubernetes,
    url: "https://kubernetes.io/",
  },
  {
    img: cuda,
    url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html",
  },
  {
    img: aws,
    url: "https://aws.amazon.com/",
  },
  {
    img: linux,
    url: "https://www.linux.org/",
  },
];
</script>

<style scoped lang="scss">
a {
  color: #007fff;
  // color: #0e6ba8;
  &:hover {
    text-decoration: underline;
  }
}
ul {
  list-style: none;
  li {
    &::before {
      content: "-";
      display: inline-block;
      width: 20px;
    }
  }
}
</style>
