<template>
  <div class="mt-10 text-center text-4xl font-bold">Contact Us</div>
  <div class="text-center text-base">
    Want to find out more about our lab? Let's get in touch.
  </div>
  <div class="mt-20 flex justify-center">
    <div class="mr-10 h-fit w-[450px] rounded-sm p-5 shadow-app">
      <div class="text-2xl font-bold">Drop us a line</div>
      <contact-form />
    </div>
    <div>
      <div class="text-xl font-bold">Try other ways to connect?</div>
      <div class="text-gray-400">
        Call, email, send us a postcard - whatever talks with us!
      </div>
      <div class="mt-4 border-b py-4">
        <div class="flex items-center text-lg text-primary">
          <n-icon><place-outlined /> </n-icon>
          <span class="ml-2">Location</span>
        </div>
        Department of Computer Science, NTHU Room<br />
        835/836, EECS Building
      </div>
      <div class="border-b py-4">
        <div class="flex items-center text-lg text-primary">
          <n-icon><phone /> </n-icon>
          <span class="ml-2">Phone</span>
        </div>
        <a href="tel:+886-3-5715131" class="hover:underline">
          +886-3-5715131 (ext. 33538)
        </a>
      </div>
      <div class="border-b py-4">
        <div class="flex items-center text-lg text-primary">
          <n-icon><email /> </n-icon>
          <span class="ml-2">Email</span>
        </div>
        <a href="mailto:jchou@lsalab.cs.nthu.edu.tw" class="hover:underline">
          jchou@lsalab.cs.nthu.edu.tw
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactForm from "@/components/ContactForm.vue";
import { NIcon } from "naive-ui";
import { PlaceOutlined } from "@vicons/material";
import { Phone, Email } from "@vicons/carbon";
const emits = defineEmits(["ready"]);
emits("ready");
</script>
