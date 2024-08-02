<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { RouterView } from 'vue-router'
ElMessage({
  message: 'hello',
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
