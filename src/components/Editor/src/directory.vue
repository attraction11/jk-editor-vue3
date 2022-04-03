<template>
  <div class="directory-wrap">
    <div class="title">
      目录
    </div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane
        key="1"
        tab="标题"
        class="data-toc-wrapper"
      >
        <div
          class="data-toc"
        >
          <a
            v-for="(item, index) in tocData"
            :key="item.id"
            :href="`#${item.id}`"
            :class="tocClass(item.depth, index)"
          >{{ item.text }}</a>
        </div>
      </a-tab-pane>
      <a-tab-pane
        key="2"
        tab="图片"
        force-render
      >
        图片
      </a-tab-pane>
      <a-tab-pane
        key="3"
        tab="表格"
      >
        表格
      </a-tab-pane>
      <a-tab-pane
        key="4"
        tab="脚注"
      >
        脚注
      </a-tab-pane>
      <a-tab-pane
        key="5"
        tab="链接"
      >
        链接
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts" name="Directory">
import { ref, reactive, onMounted, watchEffect } from 'vue'
import { $ } from '@aomao/engine'
import { Outline } from '@aomao/plugin-heading'

const outline = new Outline()

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

const activeKey = ref<string>('1')
// const tocRef = ref(null)
let readingSection = ref(-1)
let tocData = reactive([])

const getTocData = () => {
  // 从编辑区域提取符合结构要求的标题 Dom 节点
  const nodes: Array<Element> = []
  const { card } = props.editor

  props.editor.container.find('h1,h2,h3,h4,h5,h6').each((child) => {
    const node = $(child)
    // Card 里的标题，不纳入大纲
    if (card.closest(node)) {
      return
    }
    // 非一级深度标题，不纳入大纲
    if (!node.parent()?.isRoot()) {
      return
    }
    nodes.push(node.get<Element>()!)
  })
  tocData = outline.normalize(nodes)
}

const findReadingSection = (elements: Array<Element>, top: number) => {
  top = top || 0
  if (!elements || elements.length === 0) return -1
  let i = 0
  let index = -1
  const len = elements.length
  for (; i < len; i++) {
    const element = elements[i]
    if (!element || !element.getBoundingClientRect) continue
    const rect = element.getBoundingClientRect()
    if (rect.height === 0) continue
    if (rect.top <= top + 1) {
      if (i === len - 1) {
        index = i
      } else {
        const nexElement = elements[i + 1]
        if (!nexElement || !nexElement.getBoundingClientRect) continue
        const nextRect = nexElement.getBoundingClientRect()
        if (nextRect.top > top + 1) {
          index = i
          break
        }
      }
    }
  }
  return index
}

const listenerViewChange = () => {
  const data: Array<HTMLElement> = tocData
    .map(({ id }) => document.getElementById(id))
    .filter((element) => element !== null) as Array<HTMLElement>
  readingSection = findReadingSection(data, 220)
}

const tocClass = (depth, index) => {
  let className = `data-toc-item data-toc-item-${depth}`
  if (index === readingSection.value) {
    className += ' data-toc-item-active'
  }
  return className
}

// onMounted(() => {
//   getTocData()
// })
watchEffect(() => {
  getTocData()
})
</script>

<style lang="less">
.directory-wrap {
  width: 300px;
  height: 100%;
  background-color: #353e42;
  .title {
    margin: 12px 15px 0;
  }
  .ant-tabs {
    font-size: 12px;
    padding: 0 15px;
    color: white;
    .ant-tabs-nav .ant-tabs-tab {
      font-size: 12px;
      padding: 12px 6px 12px 12px;
      margin: 0 12px 0 0;
    }
    .data-toc-wrapper {
      width: 100%;
      margin: 0 10px 0 0;
      .data-toc {
        overflow: auto;
        height: calc(100vh - 158px);
        padding: 0 10px 12px;
        .data-toc-item {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          font-size: 12px;
          line-height: 20px;
          color: inherit;
        }
        .data-toc-item-active,
        .data-toc-item:hover,
        .data-toc-item:focus{
          color: #1890FF;
          text-decoration: none;
        }
        .data-toc-item-2 {
          padding-left: 16px;
        }
        .data-toc-item-3 {
          padding-left: 32px;
        }
        .data-toc-item-4 {
          padding-left: 48px;
        }
        .data-toc-item-5 {
          padding-left: 64px;
        }
        .data-toc-item-6 {
          padding-left: 80px;
        }
        &::-webkit-scrollbar{
          width:6px;
          height:6px;
          /**/
        }
        &::-webkit-scrollbar-track{
          background: rgb(239, 239, 239);
          border-radius:2px;
        }
        &::-webkit-scrollbar-thumb{
          background: #bfbfbf;
          border-radius:6px;
        }
        &::-webkit-scrollbar-corner{
          background: #179a16;
        }
      }
    }
  }
}
</style>
