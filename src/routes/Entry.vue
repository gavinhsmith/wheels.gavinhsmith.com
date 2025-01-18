<script setup lang="ts">
import ContentWarning from "../components/ContentWarning.vue";
</script>

<template>
  <div class="body h-full flex flex-col justify-center items-center">
    <div class="bg-slate-100 p-2 flex flex-col items-center">
      <h1 class="text-2xl">Welcome to Mr. Wheels' place.</h1>
      <p class="mb-8">Enter at your own risk. Some have never left.</p>
      <RouterLink class="text-2xl" to="/home">Enter</RouterLink>
      <ContentWarning class="mt-8" />
    </div>
  </div>
</template>

<style scoped>
.body {
  background-image: url("/assets/images/space.gif");
}
</style>
