<template>
  <n-form :model="formValue" :rules="rules" ref="formRef">
    <n-form-item :show-label="false" path="name" :show-feedback="false">
      <n-input class="mt-6" placeholder="Name" v-model:value="formValue.name" />
    </n-form-item>
    <n-form-item :show-label="false" path="email" :show-feedback="false">
      <n-input
        class="mt-2"
        placeholder="Email"
        v-model:value="formValue.email"
      />
    </n-form-item>
    <n-form-item :show-label="false" path="message" :show-feedback="false">
      <n-input
        class="mt-2"
        type="textarea"
        placeholder="Message"
        v-model:value="formValue.message"
        :autosize="{ maxRows: 3 }"
      />
    </n-form-item>
    <n-button class="mt-4" type="primary" style="width: 100%" @click="onSubmit">
      SUBMIT
    </n-button>
  </n-form>
</template>

<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  useNotification,
  FormRules,
} from "naive-ui";
import { ref } from "vue";

const notification = useNotification();
const formRef = ref<typeof NForm | null>(null);
const formValue = ref({
  name: "",
  email: "",
  message: "",
});
const rules: FormRules = {
  name: {
    required: true,
    message: "Please input your name",
    trigger: "blur",
  },
  email: [
    {
      required: true,
      message: "Please input your email",
      trigger: "blur",
    },
    { type: "email", message: "Please provide a valid email", trigger: "blur" },
  ],
  message: {
    required: true,
    message: "Please input your message",
    trigger: "blur",
  },
};

const onSubmit = (e: any) => {
  e.preventDefault();
  formRef.value!.validate((errors: any[]) => {
    if (!errors) {
      notification.success({
        title: "Message submitted",
        content: "Thanks for the message, we'll reply you ASAP!",
        duration: 3000,
      });
    } else {
      notification.error({
        title: "Error",
        content: errors.reduce(
          (pre, cur) => (pre += cur[0].message + "\n"),
          ""
        ),
        duration: 3000,
      });
    }
  });
};
</script>

<style scoped lang="scss">
::v-deep(.n-input) {
  background-color: transparent !important;
}
</style>
