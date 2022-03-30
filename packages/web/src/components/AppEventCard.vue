<template>
  <n-card class="shadow-app" size="small">
    <div class="mb-2 flex items-center">
      <div class="mr-2 h-3 w-3 rounded-sm bg-[#9a9cff]"></div>
      <div class="flex-grow font-bold">{{ props.event.summary }}</div>
      <n-popover placement="bottom" trigger="click">
        <template #trigger>
          <n-button text>
            <n-icon><more-vert-round /></n-icon>
          </n-button>
        </template>
        <n-button text size="small">
          <a :href="props.event.htmlLink" target="_blank">
            Show in Google Calendar
          </a>
        </n-button>
      </n-popover>
    </div>
    <div v-if="props.event.hangoutLink" class="flex">
      <img :src="GoogleMeet" class="mr-2 h-6 w-6" />
      <n-button type="primary" size="small">
        <a :href="props.event.hangoutLink" target="_blank">
          Join with Google Meet
        </a>
      </n-button>
    </div>
    <div class="mt-2 text-gray-500">
      {{ format(props.event.start.dateTime) }}
      -
      {{ format(props.event.end.dateTime) }}
    </div>
  </n-card>
</template>
<script setup lang="ts">
import { NCard, NButton, NIcon, NPopover } from "naive-ui";
import GoogleMeet from "@/assets/google-meet.png";
import { format } from "@/utils/date";
import { PropType } from "vue";
import { MoreVertRound } from "@vicons/material";

type Event = {
  summary: string;
  htmlLink: string;
  hangoutLink?: string;
  start: {
    dateTime: string | Date;
  };
  end: {
    dateTime: string | Date;
  };
};

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
});
</script>
