<template>
  <div
    :class="{ 'border-t': props.inDrawer, 'pt-2': props.inDrawer }"
    class="dark:border-gray-500"
  >
    <template v-if="me">
      <n-popover v-if="!props.inDrawer" style="padding: 0" trigger="click">
        <template #trigger>
          <div class="flex items-center">
            <n-button text>
              <n-avatar round size="small" :src="me.picture || User" />
            </n-button>
          </div>
        </template>
        <div>
          <div class="border-b px-4 py-2 dark:border-gray-500">
            <div>Signed in as</div>
            <div class="font-extrabold">{{ me.username }}</div>
          </div>
          <n-button
            class="!flex !justify-start !px-4 !text-rose-500"
            block
            :bordered="false"
            @click="logout"
          >
            {{ t("auth.signOut") }}
          </n-button>
        </div>
      </n-popover>
      <div v-else>
        <div class="mb-1 flex items-center border-b pb-2 dark:border-gray-500">
          <n-avatar round size="small" :src="me.picture || User" />
          <div class="ml-2 font-extrabold">{{ me.username }}</div>
        </div>
        <n-button
          class="!flex !justify-start !pl-[2px] !text-rose-500"
          size="small"
          block
          :bordered="false"
          @click="logout"
        >
          <template #icon>
            <n-icon size="18">
              <log-out-outline />
            </n-icon>
          </template>
          <span class="text-sm">{{ t("auth.signOut") }}</span>
        </n-button>
      </div>
    </template>
    <n-button v-else ghost type="primary" @click="login">
      {{ t("auth.signIn") }}
    </n-button>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store";
import { NButton, NPopover, NAvatar, NIcon } from "naive-ui";
import User from "@/assets/user.png";
import { LogOutOutline } from "@vicons/ionicons5";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  inDrawer: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();
const authStore = useAuthStore();
const me = computed(() => authStore.me);

const logout = () => {
  authStore.logout();
};

const login = () => {
  router.push({
    name: "LoginView",
    query: {
      "redirect-uri": route.fullPath,
    },
  });
};
</script>
