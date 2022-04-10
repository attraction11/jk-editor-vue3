<template>
  <div
    class="data-toc"
  >
    <a
      v-for="(item, index) in imgData"
      :key="item.id"
      :href="`#${item.id}`"
      :class="tocClass(index)"
    >
    <img :src="item.source" alt="">
    </a>
  </div>
</template>

<script setup lang="ts" name="Directory">
import { ref, reactive, watchEffect } from 'vue'
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
let imgData = reactive([])

const getImgData = () => {
  // 从编辑区域提取符合结构要求的标题 Dom 节点
  const nodes: Array<Element> = []

  props.editor.container.find('img').each((child) => {
    const node = $(child)
    nodes.push(node.get<Element>()!)
  })
  imgData = nodes
  console.log('imgData: ', imgData);
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
  const data: Array<HTMLElement> = imgData
    .map(({ id }) => document.getElementById(id))
    .filter((element) => element !== null) as Array<HTMLElement>
  readingSection = findReadingSection(data, 220)
}

const tocClass = (index) => {
  let className = `data-toc-item`
  if (index === readingSection.value) {
    className += ' data-toc-item-active'
  }
  return className
}

watchEffect(() => {
  getImgData()
})
</script>

<style scoped lang="less">
.data-toc {
  overflow: auto;
  width: 184px;
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
  .data-toc-item:focus{
    text-decoration: none;
    border: 1px solid #1890FF;
  }
  &::-webkit-scrollbar{
    width:6px;
    height:6px;
    /**/
  }
  &::-webkit-scrollbar-track{
    border-radius:2px;
  }
  &::-webkit-scrollbar-thumb{
    background: #c1c1c1;
    border-radius:6px;
  }
  &::-webkit-scrollbar-corner{
    background: #179a16;
  }
}
</style>
