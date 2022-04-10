<template>
  <div class="revise-record-wrap">
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

<script setup lang="ts" name="revise-record">
import { defineProps } from 'vue'

const scrollTop = (id) => {
  // selectNode.scrollIntoView()
  console.log('id: ', id)
  const top = document.querySelector(`p[data-id="${id}"]`).offsetTop
  console.log('top: ', top)
  document.querySelector('.editor-content').scrollTop = top - 100
}

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
