<template>
  <div class="comment-record-wrap">
    <h4>评论记录</h4>
    <div
      class="comment-list cursor-pointer"
      v-for="item in props.comments"
      :key="item.id"
    >
      <div class="editor-meta">
        <div class="meta-info">
          <span>{{ item.comment_name }}</span>
          <span>{{ item.comment_time }}</span>
          <span>{{ item.doc_version }}</span>
        </div>
        <div class="record-info">
          <div
            :class="item.id"
            :data-id="item.id"
            v-html="item.row_comment"
            @click="scrollTop(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="comment-record">
import { defineProps } from 'vue'

const scrollTop = (id) => {
  // selectNode.scrollIntoView()
  console.log('id: ', id)
  const top = document.querySelector(`p[data-id="${id}"]`).offsetTop
  console.log('top: ', top)
  document.querySelector('.editor-content').scrollTop = top - 100
}

const props = defineProps({
  comments: {
    type: Array,
    default: []
  }
})
</script>

<style scoped lang="less">
.comment-record-wrap {
  padding: 10px;
  height: auto;
  margin: 0 0 0 10px;
  background-color: #fff;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .editor-meta {
    .meta-info {
      display: flex;
      line-height: 30px;
      margin-bottom: 5px;
      color: #000;
      border-bottom: 1px solid rgb(212, 210, 210);
      span:nth-child(2) {
        color: #666;
        padding: 0 15px;
      }
    }
  }
}
</style>
