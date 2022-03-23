<template>Please wait...</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const params: any = {};
  urlParams.forEach((value, key) => (params[key] = value));
  if (window.opener) {
    window.opener.postMessage(params);
    window.close();
  }
});
</script>
