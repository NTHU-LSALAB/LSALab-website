<template>
  <app-outline-button @click="goGithub">
    <template #icon>
      <logo-github class="text-primary" />
    </template>
  </app-outline-button>
</template>

<script setup lang="ts">
import { LogoGithub } from "@vicons/ionicons5";
import AppOutlineButton from "@/components/AppOutlineButton.vue";

const goGithub = () => {
  window.open("https://github.com/NTHU-LSALAB", "_blank");
};
</script>
