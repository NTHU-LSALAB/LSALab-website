<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="text-2xl font-bold">{{ t("page.member") }}</div>
    <template v-for="grade in sortedGrades" :key="grade.id">
      <div class="mt-8 text-xl">{{ grade.attributes.name }}</div>
      <div class="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <n-card
          v-for="student in grade.attributes.students.data"
          :id="student.id"
          :key="student.id"
          :ref="setStuedentRef"
          size="small"
        >
          <n-ellipsis class="title text-lg font-bold">
            {{ student.attributes.name || student.attributes.enName }}
            <span v-if="student.attributes.name && student.attributes.enName"
              >({{ student.attributes.enName }})</span
            >
          </n-ellipsis>
          <div class="text-base">
            <div>
              {{ moment(student.attributes.startDate).format("YYYY-MM") }}
              ~
              <span v-if="student.attributes.endDate">{{
                moment(student.attributes.endDate).format("YYYY-MM")
              }}</span>
              <span v-else>now</span>
            </div>
            <div>{{ student.attributes.interest }}</div>
            <div v-if="student.attributes.job">
              <span class="font-bold">JOB: </span>{{ student.attributes.job }}
            </div>
            <template v-if="student.attributes.thesis">
              <n-ellipsis trigger="hover" line-clamp="2">
                <div>
                  <span class="font-bold">Thesis: </span>
                  {{ student.attributes.thesis.title }}
                  (<a :href="student.attributes.thesis.pdf" target="_blank">
                    pdf
                  </a>
                  ,
                  <a :href="student.attributes.thesis.slides" target="_blank"
                    >slides</a
                  >)
                </div>
                <template #tooltip>
                  <div class="w-[400px]">
                    {{ student.attributes.thesis.title }}
                  </div>
                </template>
              </n-ellipsis>
              <a
                class="text-blue-400 hover:underline"
                :href="student.attributes.thesis.pdf"
                target="_blank"
              >
                pdf
              </a>
              ,
              <a
                class="text-blue-400 hover:underline"
                :href="student.attributes.thesis.slides"
                target="_blank"
                >slides</a
              >
            </template>
          </div>
          <template #action>
            <div class="flex items-center">
              <a
                :href="student.attributes.websiteLink"
                target="_blank"
                class="flex"
                :class="{
                  disabled:
                    !student.attributes.websiteLink ||
                    !student.attributes.websiteLink.length,
                }"
              >
                <n-icon size="25"><web-sharp /></n-icon>
              </a>
              <a
                :href="`mailto:${student.attributes.email}`"
                target="_blank"
                class="flex"
                :class="{
                  disabled:
                    !student.attributes.email ||
                    !student.attributes.email.length,
                }"
              >
                <n-icon class="ml-2" size="25"><mail20-regular /></n-icon>
              </a>
            </div>
          </template>
        </n-card>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { NCard, NIcon, NEllipsis } from "naive-ui";
import { WebSharp } from "@vicons/material";
import { Mail20Regular } from "@vicons/fluent";
import moment from "moment";
import { useI18n } from "vue-i18n";
import { useCachedRequest } from "@/composables/useCachedRequest";
import { computed, nextTick, onBeforeUpdate, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const emits = defineEmits(["ready"]);
const { t } = useI18n();

const route = useRoute();
const highlight = computed(() => route.query.highlight?.toString());
const { items: grades, isReady: loaded } = useCachedRequest<any>("grades", {
  params: {
    populate: "*",
    sort: ["id"],
  },
});

// student ref
const studentRefs = ref<any[]>([]);
const setStuedentRef = (el: any) => {
  if (el) studentRefs.value?.push(el);
};
onBeforeUpdate(() => {
  studentRefs.value = [];
});
const gotoTarget = () => {
  if (highlight.value && loaded.value) {
    const id =
      typeof highlight.value === "string"
        ? parseInt(highlight.value)
        : highlight.value;
    const target = studentRefs.value.find((ref) => ref.$attrs.id === id);
    if (target) {
      nextTick(() => {
        target.$el.querySelector(".title").classList.add("highlight");
        target.$el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
    emits("ready");
  }
};
onMounted(gotoTarget);
watch([() => studentRefs.value.length, highlight], gotoTarget);

if (loaded.value) emits("ready");
watch(loaded, (val) => {
  if (val) {
    emits("ready");
  }
});

const sortedGrades = computed(() =>
  grades.value?.map((grade) => {
    grade.attributes.students.data = grade.attributes.students.data.sort(
      (a: any, b: any) => {
        return b.attributes.startDate.localeCompare(a.attributes.startDate);
      }
    );
    return grade;
  })
);
</script>

<style lang="scss" scoped>
a.disabled {
  pointer-events: none;
  cursor: default;
  color: gray;
}
:deep(.title.highlight) {
  font-style: none !important;
  background: yellow !important;
}
</style>
