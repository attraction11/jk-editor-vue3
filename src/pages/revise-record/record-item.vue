<template>
  <div class="revise-list">
    <div class="avatar">
      {{ props.record.editor_name.at(0) }}
    </div>
    <div class="editor-meta">
      <div class="meta-info">
        <span>{{ props.record.editor_name }}</span>
        <span>{{ dayjs(props.record.editor_time).format('YYYY-MM-DD') }}</span>
        <span>{{ props.record.doc_version }}</span>
      </div>
      <div class="record-info">
        <DiffWord
          :origin="props.record.row_original"
          :history="props.record.row_history"
          :id="props.record.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="revise-list">
import type { PropType } from 'vue'
import type { Record } from '~/api/types/editor'

import DiffWord from './diff-word.vue'

const props = defineProps({
  record: {
    type: Object as PropType<Record>,
    default: () => {}
  }
})
</script>

<style scoped lang="less">
.revise-list {
  width: 100%;
  padding: 15px 0;
  min-height: 100px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .avatar {
    border-radius: 50%;
    flex-basis: 30px;
    height: 30px;
    background-color: bisque;
    text-align: center;
    /* vertical-align: middle; */
    line-height: 30px;
    margin-right: 10px;
  }
  .editor-meta {
    flex: 1;
    .meta-info {
      display: flex;
      line-height: 30px;
      margin-bottom: 5px;
      color: #000;
      span:nth-child(2) {
        color: #666;
        padding: 0 15px;
      }
    }
    .record-info {
      line-height: 20px;
      font-size: 14px;
      color: #111;
      cursor: pointer;
    }
  }
}
.revise-list:last-child {
  border-bottom: none;
}
</style>
