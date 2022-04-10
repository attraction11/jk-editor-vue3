<template>
  <div class="revise-record-wrap">
    <h4>评论记录</h4>
    <div
      class="comment-list cursor-pointer"
      v-for="item in comments"
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
import { onMounted, ref } from 'vue'

const comments = ref([])

const scrollTop = (id) => {
  // selectNode.scrollIntoView()
  console.log('id: ', id)
  const top = document.querySelector(`p[data-id="${id}"]`).offsetTop
  console.log('top: ', top)
  document.querySelector('.editor-content').scrollTop = top - 100
}

onMounted(() => {
  loadComments()
})

const loadComments = async () => {
  comments.value = await [
    {
      id: 'pd157317-g3XQCDlQ',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_comment: '<p style="text-indent: 2.28571em; line-height: 2.5;" data-id="pd157317-g3XQCDlQ">这句话有问题~</p>',
      comment_name: 'user1',
      comment_time: '2022.02.15'
    }
  ]

  for (let i = 0; i < comments.value.length; i++) {
    const id = comments.value[i].id
    const selectNode = document.querySelector(`.am-engine p[data-id=${id}]`)
    if (selectNode) {
      selectNode.style.textDecoration = 'dashed underline orange'
    }
  }
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
