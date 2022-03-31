<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="text-2xl font-bold">Journal/Conference list</div>
    <n-button class="!mt-8" :disabled="!internal" @click="showCreator = true">
      {{ t("button.create") }}
    </n-button>
    <n-modal v-model:show="showCreator">
      <item-creator
        tag="journals"
        @confirm="handleConfirm"
        @cancel="showCreator = false"
      />
    </n-modal>
    <n-data-table
      class="mt-4"
      :data="internalDocs"
      :columns="headers"
      :pagination="pagination"
      :loading="loading"
      scroll-x="800"
    />
  </div>
</template>

<script setup lang="ts">
import {
  NButton,
  NDataTable,
  NIcon,
  NInput,
  NPopconfirm,
  NModal,
  NDatePicker,
} from "naive-ui";
import { Edit32Regular } from "@vicons/fluent";
import { computed, h, ref, watch } from "vue";
import { TableColumn } from "naive-ui/lib/data-table/src/interface";
import { CheckRound, CloseRound, DeleteOutlineRound } from "@vicons/material";
import ItemCreator from "@/components/ItemCreator.vue";
import { renderHref } from "@/utils/component";
import moment from "moment";
import { useI18n } from "vue-i18n";
import { useAuthStore, useDocStore } from "@/store";
const { t } = useI18n();

const emits = defineEmits(["ready"]);
const authStore = useAuthStore();
const docStore = useDocStore();
docStore.tag = "journals";
docStore.fetchDocs().then(() => emits("ready"));
const showCreator = ref(false);

const editingIdx = ref(-1);
const handleConfirm = (data: any) => {
  showCreator.value = false;
  docStore.createDoc(data);
};
const docs = computed(() => docStore.docs);
const internalDocs = ref<any[]>([]);
const loading = computed(() => docStore.loading);
const editLoading = computed(() => docStore.editLoading);
const internal = computed(() => authStore.internal);

watch(docs, (value) => {
  internalDocs.value = value;
});

const headers = ref<TableColumn<any>[]>([
  {
    title: "Type",
    key: "type",
    width: 100,
    render(row, index) {
      return editingIdx.value === index
        ? h(
            NInput,
            {
              style: {
                width: "400px",
              },
              value: row.type,
              onUpdateValue(v) {
                internalDocs.value[index].type = v;
              },
              loading: editLoading.value,
            },
            {
              suffix: null,
            }
          )
        : row.type;
    },
  },
  {
    title: "Title",
    key: "title",
    width: 200,
    ellipsis: {
      tooltip: true,
    },
    render(row, index) {
      return editingIdx.value === index
        ? h(NInput, {
            style: {
              width: "400px",
            },
            value: row.title,
            onUpdateValue(v) {
              internalDocs.value[index].title = v;
            },
            loading: editLoading.value,
          })
        : row.title;
    },
  },
  {
    title: "Deadline",
    key: "deadline",
    width: 150,
    render(row, index) {
      return editingIdx.value === index
        ? h(NDatePicker, {
            formattedValue: row.deadline,
            valueFormat: "yyyy-MM-dd",
            onUpdateFormattedValue(v) {
              internalDocs.value[index].deadline = v;
            },
            loading: editLoading.value,
          })
        : moment(row.deadline).format("YYYY-MM-DD");
    },
  },
  {
    title: "Link",
    key: "link",
    ellipsis: {
      tooltip: true,
    },
    render(row, index) {
      return editingIdx.value === index
        ? h(NInput, {
            style: {
              width: "400px",
            },
            value: row.link,
            onUpdateValue(v) {
              internalDocs.value[index].link = v;
            },
            loading: editLoading.value,
          })
        : renderHref(row.link, row.link);
    },
  },
  {
    title: "Ranking",
    key: "ranking",
    width: 80,
    render(row, index) {
      return editingIdx.value === index
        ? h(NInput, {
            style: {
              width: "400px",
            },
            value: row.ranking,
            onUpdateValue(v) {
              internalDocs.value[index].ranking = v;
            },
            loading: editLoading.value,
          })
        : row.ranking;
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
                    docStore.edit(internalDocs.value[index]).finally(() => {
                      internalDocs.value = docStore.docs;
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
                    docStore.deleteDoc(internalDocs.value[index]);
                  },
                },
                {
                  default: () => "確定刪除此資料？",
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
]);

const pagination = {
  pageSize: 10,
};
</script>

<style scoped lang="scss">
::v-deep(.n-input__suffix) {
  display: none;
}
</style>
