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
    <div class="mt-10 ">
      <label
        for="exampleFormControlTextarea1"
        class="form-label inline-block mb-2 text-gray-700"
      >请输入评论：</label>
      <textarea
        class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-sm
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="exampleFormControlTextarea1"
        rows="3"
        v-model="commentValue"
        placeholder="评论~"
      />
      <button
        type="button"
        class="inline-block px-3 py-1.5 mt-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        @click="sumbitBtn"
      >
        提交
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" name="comment-record">
import { defineProps, ref } from 'vue'

const commentValue = ref<string>('')

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

const emit = defineEmits<{
  (event: 'sumbit', message: string): void;
}>()

const sumbitBtn = () => {
  emit('sumbit', commentValue.value)
  commentValue.value = ''
}
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
