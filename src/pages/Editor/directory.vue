<template>
  <div class="data-toc">
    <a
      v-for="(item, index) in tocData"
      :key="item.id"
      href="void()"
      :class="tocClass(item.depth, index)"
      @click="onListClick($event, item.id)"
    >{{ item.text }}</a>
  </div>
</template>

<script setup lang="ts" name="Directory">
import { ref, onMounted } from 'vue'
import { $ } from '@aomao/engine'
import { Outline } from '@aomao/plugin-heading'

const outline = new Outline()

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

let readingSection = ref(-1)
let tocData = ref([])

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

  tocData.value = outline.normalize(nodes)
}

const onListClick = (e, id) => {
  console.log('e, id: ', e, id)
  e = e || window.event
  e.preventDefault()
  const top = document.querySelector(`#${id}`).offsetTop
  document.querySelector('.editor-content').scrollTop = top
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

onMounted(() => {
  props.editor.on('change', getTocData)
  props.editor.on('afterSetValue', getTocData)
})

</script>

<style scoped lang="less">
.data-toc {
  overflow: auto;
  height: calc(100vh - 108px);
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
  .data-toc-item:focus {
    color: #1890ff;
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
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    /**/
  }
  &::-webkit-scrollbar-track {
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-corner {
    background: #179a16;
  }
}
</style>
