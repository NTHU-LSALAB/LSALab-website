<template>
  <div class="relative flex h-main border-t dark:border-gray-500">
    <n-scrollbar ref="today" class="!w-72 shrink-0 border-r p-5">
      <div class="flex items-center justify-between">
        <div class="text-xl">Today's Events</div>
        <!-- <n-button v-if="width < 1280" text @click.stop="toggle">
          <n-icon>
            <ios-arrow-left24-filled
              class="duration-300"
              :class="{ 'rotate-180': reversed }"
            />
          </n-icon>
        </n-button> -->
      </div>
      <template v-if="todayEvents && todayEvents.length">
        <app-event-card
          v-for="(evt, i) in todayEvents"
          :key="i"
          :event="evt"
          class="mt-2"
        />
      </template>
      <div v-else class="mt-4 flex justify-center text-gray-500">None</div>
      <template v-if="selectedDate && !todayIsSelected">
        <div class="mt-4 text-xl">
          {{ selectedDate.year }}/{{ selectedDate.month }}/{{
            selectedDate.date
          }}
          Events
        </div>
        <template v-if="selectedEvents && selectedEvents.length">
          <app-event-card
            v-for="(evt, i) in selectedEvents"
            :key="i"
            :event="evt"
            class="mt-2"
          />
        </template>
        <div v-else class="mt-2 flex justify-center text-gray-500">None</div>
      </template>
    </n-scrollbar>
    <app-calendar class="calendar flex-grow pt-4" style="height: 100%" />
  </div>
</template>

<script setup lang="ts">
import AppCalendar from "@/components/AppCalendar.vue";
import AppEventCard from "@/components/AppEventCard.vue";
// import gsap from "gsap";

import { NScrollbar } from "naive-ui";
import { computed, onMounted } from "vue";
// import { IosArrowLeft24Filled } from "@vicons/fluent";
import { useCalendarStore } from "@/store";
// import { useWidth } from "@/composables/useWidth";

const emits = defineEmits(["ready"]);
const calendarStore = useCalendarStore();
// const showAnim = gsap.timeline();
// const today = ref<HTMLDivElement | null>(null);
onMounted(() => {
  // showAnim
  //   .from(today.value, {
  //     xPercent: -90,
  //     // paused: true,
  //     duration: 0.4,
  //     ease: "power4.inOut",
  //     onComplete: () => {
  //       reversed.value = false;
  //     },
  //     onReverseComplete: () => {
  //       reversed.value = true;
  //     },
  //   })
  //   .progress(1);
  // window.addEventListener("resize", onResize);
  const d = new Date();
  calendarStore
    .fetchEvents({
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    })
    .then(() => emits("ready"));
});
// const width = useWidth();
// const reversed = ref(false);

// const toggle = () => {
//   if (reversed.value && width.value < 1280) {
//     showAnim.play();
//   } else if (width.value < 1280) {
//     showAnim.reverse();
//   }
// };
const todayEvents = computed(() => calendarStore.todayEvents);
const selectedEvents = computed(() => calendarStore.selectedEvents);
const selectedDate = computed(() => calendarStore.selectedDate);
const todayIsSelected = computed(() => {
  if (!selectedDate.value) return false;
  const today = new Date();
  const { year, month, date } = selectedDate.value;
  return (
    year === today.getFullYear() &&
    month === today.getMonth() + 1 &&
    date === today.getDate()
  );
});
// watch(selectedDate, () => {
//   showAnim.play();
// });
</script>

<style scoped lang="scss">
.calendar ::v-deep(.n-button-group) {
  margin-right: 8px;
}
.calendar ::v-deep(.n-calendar-header__title) {
  margin-left: 8px;
}
</style>
