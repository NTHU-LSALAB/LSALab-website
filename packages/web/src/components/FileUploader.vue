<template>
  <n-dialog
    title="Upload slide"
    negative-text="Cancel"
    positive-text="Confirm"
    @positive-click="handleConfirm"
    @negative-click="emits('cancel')"
    @close="emits('cancel')"
    :loading="uploading"
  >
    <n-form v-if="files.length" :model="model" ref="formRef" :rules="rules">
      <n-form-item label="Title" path="title">
        <n-input placeholder="Slide name" v-model:value="model.title" />
      </n-form-item>
    </n-form>
    <n-upload
      @change="handleChange"
      :max="1"
      accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf"
    >
      <n-upload-dragger v-if="!files.length">
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">
          Click or drag a file to this area to upload
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          Upload your slide for the group meeting presentation.<br />
          Please note that your slide's title should start with the date of the
          presentation.
        </n-p>
      </n-upload-dragger>
    </n-upload>
  </n-dialog>
</template>
<script setup lang="ts">
import {
  NDialog,
  NUpload,
  NUploadDragger,
  NText,
  NP,
  NIcon,
  UploadFileInfo,
  NInput,
  NForm,
  NFormItem,
} from "naive-ui";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { computed, ref } from "vue";
import moment from "moment";
import { useDriveStore } from "@/store";
const emits = defineEmits(["confirm", "cancel"]);

const driveStore = useDriveStore();
const uploading = computed(() => driveStore.uploading);
// form
const formRef = ref<typeof NForm | null>(null);
const model = ref({ title: "" });
const DATE_FORMAT = "YYYY-MM-DD";
const rules = {
  title: [
    {
      required: true,
      validator: (rule: any, value: any) => {
        return moment(value, DATE_FORMAT).isValid();
      },
      message: `Title should contain a date with format ${DATE_FORMAT}`,
      trigger: ["input", "blur"],
    },
  ],
};
const handleConfirm = () => {
  formRef.value!.validate((errors: any) => {
    if (!errors) {
      emits("confirm", { file: files.value[0], title: model.value.title });
    }
  });
};
// files
const files = ref<UploadFileInfo[]>([]);
const handleChange = ({
  file,
  fileList,
}: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) => {
  files.value = fileList;
  model.value.title = file.name;
};
</script>

<style scoped lang="scss">
::v-deep(.n-upload-file-list) {
  margin: 0;
}
</style>
