<template>
  <div class="revise-record-wrap">
    <h4>修订记录</h4>
    <RecordItem
      v-for="item in records"
      :key="item.id"
      :record="item"
    />
  </div>
</template>

<script setup lang="ts" name="revise-record">
import { onMounted, ref } from 'vue'
import type { Record } from '~/api/types/editor'

import RecordItem from './record-item.vue'

const records = ref<Record[]>([])

onMounted(() => {
  loadRecords()
})

const loadRecords = async () => {
  records.value = await [
    {
      id: 'p002deaf-gGSHIYJE',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_purview: ['user1', 'user2', 'user3', 'user4'],
      row_history: '<p style="text-indent: 2.28571em; line-height: 2.5;" data-id="p002deaf-gGSHIYJE"><span style="font-size: 16px;"><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">甲方委托乙方就<u>&nbsp;&nbsp; 综合文档管理应用系统&nbsp;&nbsp; </u>项目进行专项技术服务，并支付技术服务报酬。双方经过平等协商，在真实、充分地表达各自意愿的基础上，根据《中华人民共和国合同法》的规定，达成如下协议，并由双方共同恪守。</span></span></p>',
      row_original: '<p style="text-indent: 2.28571em; line-height: 2.5;" data-id="p002deaf-gGSHIYJE"><span style="font-size: 16px;"><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">甲方委托乙方就<u>&nbsp;&nbsp; 综合文档管理应用系统&nbsp;&nbsp; </u>项目进行专项技术服务，并技术服务报酬。双方经过不平等协商，在表达各自意愿的基础上，根据《中华人民共和国合同法》的规定，达成如下协议，并由双方共同恪守。</span></span></p>',
      editor_name: 'user1',
      editor_time: '2022.02.15'
    },
    {
      id: 'pd157317-JPNj9iSH',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_purview: ['user1', 'user2', 'user3', 'user4'],
      row_history: '<p data-id="pd157317-JPNj9iSH">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 读者（Reader）：只能防伪文档、能编辑任何内容，能发布或回复评论。</p>',
      row_original: '<p data-id="pd157317-JPNj9iSH">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 读者（Reader）：只能访问文档、不能编辑任何内容，不能发布或回复评论。</p>',
      editor_name: 'user1',
      editor_time: '2022.02.15'
    }
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
