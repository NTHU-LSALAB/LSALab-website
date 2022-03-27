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
  location.href = "https://github.com/orgs/NTHU-LSALAB/dashboard";
};
</script>
