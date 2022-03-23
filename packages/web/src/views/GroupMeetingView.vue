<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="text-2xl font-bold">Group Meeting</div>
    <template v-if="width >= 640">
      <div
        v-if="folders.length"
        class="mt-4 grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <n-card
          v-for="folder in folders"
          @click="onSelect(folder)"
          :bordered="false"
          size="small"
          class="cursor-pointer border duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          :class="
            selectedFolder !== folder
              ? 'border-gray-200 dark:border-[#FFFFFF10]'
              : 'border-primary'
          "
        >
          <div class="flex items-center">
            <folder-person20-regular class="w-6" />
            <span class="ml-2">{{ folder.name }}</span>
          </div>
        </n-card>
      </div>
      <div
        class="mt-4 grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        v-else
      >
        <n-skeleton height="48px" v-for="i in 11" :sharp="false" />
      </div>
    </template>
    <n-select
      v-else
      class="mt-4"
      @update-value="onSelectId"
      v-model:value="selectedFolderId"
      :options="folderOptions"
    />
    <template v-if="selectedFolder">
      <n-button :disabled="!internal" class="mt-8" @click="showUploader = true">
        {{ t("button.upload") }}
      </n-button>
      <n-modal v-model:show="showUploader">
        <file-uploader
          @confirm="handleConfirm"
          @cancel="showUploader = false"
        />
      </n-modal>
      <n-data-table
        class="mt-4"
        :data="files"
        :columns="headers"
        :pagination="pagination"
        :loading="loading"
        scroll-x="800"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  NButton,
  NCard,
  NDataTable,
  NIcon,
  NInput,
  NPopconfirm,
  NSkeleton,
  NModal,
  NSelect,
} from "naive-ui";
import { Edit32Regular, FolderPerson20Regular } from "@vicons/fluent";
import { computed, onMounted, h, ref, Ref, watch, onUnmounted } from "vue";
import { TableColumn } from "naive-ui/lib/data-table/src/interface";
import { CheckRound, CloseRound, DeleteOutlineRound } from "@vicons/material";
import FileUploader from "@/components/FileUploader.vue";
import { useI18n } from "vue-i18n";
import { useAuthStore, useDriveStore } from "@/store";
const { t } = useI18n();

const emits = defineEmits(["ready"]);
const authStore = useAuthStore();
const driveStore = useDriveStore();
onMounted(() => {
  window.addEventListener("resize", onResize);
  driveStore.fetchFolders().then(() => emits("ready"));
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
const width = ref(window.innerWidth);
const onResize = () => {
  width.value = window.innerWidth;
};
// upload
const showUploader = ref(false);
const internal = computed(() => authStore.internal);

const editingIdx = ref(-1);
const selectedFolder: Ref<any> = ref(null);
const selectedFolderId = ref<string | null>(null);
const onSelect = (folder: any) => {
  if (folder) {
    selectedFolderId.value = folder.id;
    selectedFolder.value = folder;
    driveStore.fetchFiles(folder.id);
  }
};
const onSelectId = (folderId: string) => {
  onSelect(folders.value.find((folder: any) => folder.id === folderId));
};
const handleConfirm = (data: any) => {
  driveStore.uploadFile(data).then(() => (showUploader.value = false));
};
const folders = computed(() => driveStore.folders);
const folderOptions = computed(() =>
  driveStore.folders.map((folder: any) => ({
    label: folder.name,
    value: folder.id,
  }))
);
const files: Ref<any[]> = ref([]);
const loading = computed(() => driveStore.loading);
const editLoading = computed(() => driveStore.editLoading);

const storeFiles = computed(() => driveStore.storeFiles);

watch(storeFiles, (value) => {
  files.value = value;
});

const headers: TableColumn<any>[] = [
  {
    title: "Date",
    key: "date",
    width: 130,
    defaultSortOrder: "descend",
    sorter: "default",
  },
  {
    title: "Presenter",
    key: "presenter",
    width: 150,
  },
  {
    title: "Topic",
    key: "topic",
    ellipsis: {
      tooltip: true,
    },
    render(row, index) {
      return editingIdx.value === index
        ? h(NInput, {
            style: {
              width: "400px",
            },
            value: row.name,
            onUpdateValue(v) {
              files.value[index].name = v;
            },
            loading: editLoading.value,
          })
        : row.display;
    },
  },
  {
    title: () =>
      h("th", { class: "flex justify-center" }, { default: () => "Actions" }),
    key: "actions",
    width: 100,
    render(_, index) {
      return h(
        "div",
        {
          class: "flex item-center justify-center",
        },
        editingIdx.value === index
          ? [
              h(
                NButton,
                {
                  key: "done",
                  size: "small",
                  class: "mr-2",
                  textColor: "green",
                  text: true,
                  onClick: () => {
                    driveStore.edit(files.value[index]).finally(() => {
                      files.value = driveStore.storeFiles;
                      editingIdx.value = -1;
                    });
                  },
                },
                {
                  default: () =>
                    h(
                      NIcon,
                      { size: 24 },
                      {
                        default: () =>
                          h(CheckRound, null, { default: () => "" }),
                      }
                    ),
                }
              ),
              h(
                NButton,
                {
                  key: "cancel",
                  size: "small",
                  text: true,
                  type: "error",
                  onClick: () => (editingIdx.value = -1),
                },
                {
                  default: () =>
                    h(
                      NIcon,
                      { size: 24 },
                      {
                        default: () =>
                          h(CloseRound, null, { default: () => "" }),
                      }
                    ),
                }
              ),
            ]
          : [
              h(
                NButton,
                {
                  key: "edit",
                  size: "small",
                  class: "mr-2",
                  text: true,
                  disabled: !internal.value,
                  onClick: () => (editingIdx.value = index),
                },
                {
                  default: () =>
                    h(
                      NIcon,
                      { size: 24 },
                      {
                        default: () =>
                          h(Edit32Regular, null, { default: () => "" }),
                      }
                    ),
                }
              ),
              h(
                NPopconfirm,
                {
                  onPositiveClick: () => {
                    driveStore.deleteFile(files.value[index]);
                  },
                },
                {
                  default: () => "確定刪除此簡報？",
                  trigger: () =>
                    h(
                      NButton,
                      {
                        key: "delete",
                        size: "small",
                        type: "error",
                        text: true,
                        disabled: !internal.value,
                      },
                      {
                        default: () =>
                          h(
                            NIcon,
                            { size: 24 },
                            {
                              default: () =>
                                h(DeleteOutlineRound, null, {
                                  default: () => "",
                                }),
                            }
                          ),
                      }
                    ),
                }
              ),
            ]
      );
    },
  },
];

const pagination = {
  pageSize: 10,
};
</script>
