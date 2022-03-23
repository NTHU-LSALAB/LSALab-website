<template>
  <n-calendar
    @update:value="handleUpdateValue"
    @panel-change="handleUpdatePanel"
    #="{ year, month, date }"
  >
    <n-scrollbar
      v-if="events[year] && events[year][month] && events[year][month][date]"
    >
      <div
        class="flex items-center last:mb-2"
        v-for="evt in events[year][month][date]"
      >
        <div class="h-2 w-2 flex-shrink-0 rounded-full bg-[#9a9cff]" />
        <div class="ml-2 hidden flex-shrink-0 text-sm lg:block">
          {{ format(evt.start.dateTime) }}
        </div>
        <div class="ml-2 text-xs line-clamp-1 md:text-sm">
          {{ evt.summary }}
        </div>
      </div>
    </n-scrollbar>
  </n-calendar>
</template>

<script setup lang="ts">
import { NCalendar, NScrollbar } from "naive-ui";
import { format } from "@/utils/date";
import { computed } from "vue";
import { useCalendarStore } from "@/store";
const calendarStore = useCalendarStore();
const handleUpdateValue = (
  _: any,
  { year, month, date }: { year: number; month: number; date: number }
) => {
  calendarStore.selectedDate = { year, month, date };
};
const handleUpdatePanel = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  // today button bug??
  if (month > 12) month = new Date(month).getMonth() + 1;
  calendarStore.fetchEvents({ year, month });
};

const events = computed(() => calendarStore.events);
</script>

<style scoped lang="scss">
::v-deep(.n-calendar-dates) {
  min-height: 0;
}

::v-deep(.n-calendar-date__date) {
  width: 1.6em !important;
  height: 1.6em !important;
}
::v-deep(.n-calendar-cell) {
  min-height: 0;
  max-height: 100%;
  overflow: hidden;
}
</style>
