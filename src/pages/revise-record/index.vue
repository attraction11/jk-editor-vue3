<template>
  <div class="revise-record-wrap">
    <h4>修订记录</h4>
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
  padding: 10px;
  height: auto;
  margin: 0 0 0 10px;
  background-color: #fff;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
