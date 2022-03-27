<template>
  <n-dialog
    title="Create a item"
    negative-text="Cancel"
    positive-text="Submit"
    @positive-click="handleConfirm"
    @negative-click="emits('cancel')"
    @close="emits('cancel')"
  >
    <n-form :model="model" ref="formRef" :rules="rules">
      <n-form-item label="Type" path="type">
        <n-input placeholder="type" v-model:value="model.type" />
      </n-form-item>
      <n-form-item label="Title" path="title">
        <n-input placeholder="Title" v-model:value="model.title" />
      </n-form-item>
      <n-form-item label="Link" path="link">
        <n-input placeholder="Link" v-model:value="model.link" />
      </n-form-item>
      <template v-if="props.tag === 'journal'">
        <n-form-item label="Deadline" path="deadline">
          <div class="w-full">
            <n-date-picker
              placeholder="Deadline"
              v-model:formatted-value="model.deadline"
              value-format="yyyy-MM-dd"
            />
          </div>
        </n-form-item>
        <n-form-item label="Ranking" path="ranking">
          <n-input placeholder="Ranking" v-model:value="model.ranking" />
        </n-form-item>
      </template>
    </n-form>
  </n-dialog>
</template>
<script setup lang="ts">
import { NDialog, NInput, NForm, NFormItem, NDatePicker } from "naive-ui";
import { ref } from "vue";
const emits = defineEmits(["confirm", "cancel"]);
const props = defineProps({
  tag: String,
});

// form
const formRef = ref<typeof NForm | null>(null);
const model = ref({
  type: "",
  title: "",
  link: "",
  deadline: null,
  ranking: "",
});
const rules = {
  type: [
    {
      required: true,
    },
  ],
  title: [
    {
      required: true,
    },
  ],
  link: [
    {
      required: true,
    },
  ],
  deadline: [
    {
      required: props.tag === "journal",
    },
  ],
  ranking: [
    {
      required: props.tag === "journal",
    },
  ],
};
const handleConfirm = () => {
  formRef.value!.validate((errors: any) => {
    if (!errors) {
      emits("confirm", { ...model.value });
    }
  });
};
</script>

<style scoped lang="scss">
::v-deep(.n-upload-file-list) {
  margin: 0;
}
</style>
