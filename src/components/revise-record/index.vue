<template>
  <div class="revise-record-wrap">
    <h4>章节修订记录</h4>
    <RecordItem v-for="item in records" :key="item.id" :record="item"></RecordItem>
  </div>
</template>

<script setup lang="ts" name="revise-record">
import { onMounted, ref } from 'vue'
import type { Record } from '~/api/types/record'

import RecordItem from './record-item.vue'

const records = ref<Record[]>([])

onMounted(() => {
  loadRecords()
})

const loadRecords = async () => {
  records.value = await [
    {
      id: 'p6666-a001',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_purview: ['user1', 'user2', 'user3', 'user4'],
      row_original: `<p data-id="p6666-a001" style="text-indent: 2em;">酒，从来都是一个<strong>杂杂</strong>的意象。
是推杯换盏，是酩酊大醉，是失意时<span style="color: rgb(255, 77, 79);">心雨倾盆下</span>。买醉与痛苦，眼泪郁酒精齐飞。</p>`,
      row_history: `<p data-id="p6666-a001" style="text-indent: 2em;">酒，从来都是一个<strong>复杂</strong>的意象。
是推杯换盏，是酩酊大醉，是得意时看遍长安花，是失意时<span style="color: rgb(255, 77, 79);">心雨倾盆下</span>。买醉与痛苦，眼泪与酒精齐飞。</p>`,
      editor_name: 'user1',
      editor_time: 1647652096877,
    },
    {
      id: 'p6666-a003',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_purview: ['user1', 'user2', 'user3', 'user4'],
      row_original: `<p data-id="p6666-a003">所谓“凡尔赛文学”，一句话概括就是不经意间地宣妖出忧郁感。用主持人何炅的话说就是“用最低调的话，炫最高调的耀。”</p>`,
      row_history: `<p data-id="p6666-a003">所谓“凡尔赛文学”，一句话概括就是不经意间地炫耀出优越感。用主持人何炅的话说就是“用最低调的话，炫最高调的耀。”</p>`,
      editor_name: 'user1',
      editor_time: 1647652096877,
    },
  ]
}
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
