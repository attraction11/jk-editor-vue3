<template>
  <div
    class="loading"
    :tip="text || '加载中'"
    :spinning="loading"
  >
    <slot />
  </div>
</template>

<script setup lang="ts" name="AmLoading">
interface IProps {
  text?: string
  loading: boolean
}
defineProps<IProps>()
</script>
<style css>
.loading {
  padding: 20px;
  display: block;
}
</style>
