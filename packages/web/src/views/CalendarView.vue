<template>
  <div class="relative flex h-main border-t dark:border-gray-500">
    <div ref="today" class="floating-sidebar">
      <div class="flex items-center justify-between">
        <div class="text-xl">Today's Events</div>
        <n-button v-if="width < 1280" text @click.stop="toggle">
          <n-icon>
            <ios-arrow-left24-filled
              class="duration-300"
              :class="{ 'rotate-180': reversed }"
            />
          </n-icon>
        </n-button>
      </div>
      <template v-if="todayEvents && todayEvents.length">
        <n-card
          v-for="(evt, i) in todayEvents"
          :key="i"
          class="mt-2 shadow-app"
          size="small"
        >
          <div class="font-bold">{{ evt.summary }}</div>
          <div class="mt-4 text-gray-500">
            {{ format(evt.start.dateTime) }}
            -
            {{ format(evt.end.dateTime) }}
          </div>
        </n-card>
      </template>
      <div v-else class="mt-4 flex justify-center text-gray-500">None</div>
      <template v-if="selectedDate">
        <div class="mt-4 text-xl">
          {{ selectedDate.year }}/{{ selectedDate.month }}/{{
            selectedDate.date
          }}
          Events
        </div>
        <template v-if="selectedEvents && selectedEvents.length">
          <n-card
            v-for="(evt, i) in selectedEvents"
            :key="i"
            class="mt-2 shadow-app"
            size="small"
          >
            <div class="mb-2 flex items-center">
              <div class="mr-2 h-3 w-3 rounded-sm bg-[#9a9cff]"></div>
              <div class="flex-grow font-bold">{{ evt.summary }}</div>
              <n-popover placement="bottom" trigger="click">
                <template #trigger>
                  <n-button text>
                    <n-icon><more-vert-round /></n-icon>
                  </n-button>
                </template>
                <n-button text size="small">
                  <a :href="evt.htmlLink" target="_blank">
                    Show in Google Calendar
                  </a>
                </n-button>
              </n-popover>
            </div>
            <div v-if="evt.hangoutLink" class="flex">
              <img :src="GoogleMeet" class="mr-2 h-6 w-6" />
              <n-button type="primary" size="small">
                <a :href="evt.hangoutLink" target="_blank">
                  Join with Google Meet
                </a>
              </n-button>
            </div>
            <div class="mt-2 text-gray-500">
              {{ format(evt.start.dateTime) }}
              -
              {{ format(evt.end.dateTime) }}
            </div>
          </n-card>
        </template>
        <div v-else class="mt-2 flex justify-center text-gray-500">None</div>
      </template>
    </div>
    <app-calendar class="calendar flex-grow pt-4" style="height: 100%" />
  </div>
</template>

<script setup lang="ts">
import AppCalendar from "@/components/AppCalendar.vue";
import gsap from "gsap";

import { NCard, NButton, NIcon, NPopover } from "naive-ui";
import GoogleMeet from "@/assets/google-meet.png";
import { format } from "@/utils/date";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { IosArrowLeft24Filled } from "@vicons/fluent";
import { MoreVertRound } from "@vicons/material";
import { useCalendarStore } from "@/store";
const emits = defineEmits(["ready"]);
const calendarStore = useCalendarStore();
const showAnim = gsap.timeline();
const today = ref<HTMLDivElement | null>(null);
onMounted(() => {
  showAnim
    .from(today.value, {
      xPercent: -90,
      // paused: true,
      duration: 0.4,
      ease: "power4.inOut",
      onComplete: () => {
        reversed.value = false;
      },
      onReverseComplete: () => {
        reversed.value = true;
      },
    })
    .progress(1);
  window.addEventListener("resize", onResize);
  const d = new Date();
  calendarStore
    .fetchEvents({
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    })
    .then(() => emits("ready"));
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
const reversed = ref(false);

const toggle = () => {
  if (reversed.value && width.value < 1280) {
    showAnim.play();
  } else if (width.value < 1280) {
    showAnim.reverse();
  }
};
const todayEvents = computed(() => calendarStore.todayEvents);
const selectedEvents = computed(() => calendarStore.selectedEvents);
const selectedDate = computed(() => calendarStore.selectedDate);
watch(selectedDate, () => {
  showAnim.play();
});
const width = ref(window.innerWidth);
const onResize = () => {
  width.value = window.innerWidth;
};
</script>

<style scoped lang="scss">
.calendar ::v-deep(.n-button-group) {
  margin-right: 8px;
}
.calendar ::v-deep(.n-calendar-header__title) {
  margin-left: 8px;
}
</style>
