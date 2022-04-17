<template>
  <div class="revise-record-wrap">
    <h4 class="w-full pt-3 mb-0 bg-white position">修订记录</h4>
    <RecordItem
      v-for="item in props.records"
      :key="item.id"
      :record="item"
    />
  </div>
</template>

<script setup lang="ts" name="revise-record">
import RecordItem from './record-item.vue'

const props = defineProps({
  records: {
    type: Array,
    default: []
  }
})
</script>

<style scoped lang="less">
.revise-record-wrap {
  padding: 0 10px 10px;
  height: calc(100vh - 45px);
  margin: 0 0 0 10px;
  background-color: #fff;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
