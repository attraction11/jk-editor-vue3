<template>
  <div class="data-toc">
    <div
      v-for="(item, index) in imgData"
      :key="item.id"
      :class="tocClass(index)"
      @click="onListClick(item.src)"
    >
      <img class="cursor-pointer" :src="item.src" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts" name="imgList">
import { ref, onMounted } from "vue";
import { $ } from "@aomao/engine";
import { Outline } from "@aomao/plugin-heading";

const outline = new Outline();

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
});

let readingSection = ref(-1);
let imgData = ref([]);

const getImgData = () => {
  // 从编辑区域提取符合结构要求的标题 Dom 节点
  const nodes: Array<Element> = [];

  props.editor.container.find("img.data-drag-image").each((child) => {
    const node = $(child);
    nodes.push(node.get<Element>()!);
  });
  imgData.value = nodes;
};

const onListClick = (src) => {
  //
  // e = e || window.event
  // e.preventDefault()
  const top = document
    .querySelector(`.am-engine img[src="${src}"]`)
    .closest("p").offsetTop;
  document.querySelector(".editor-content").scrollTop = top;
};

const findReadingSection = (elements: Array<Element>, top: number) => {
  top = top || 0;
  if (!elements || elements.length === 0) return -1;
  let i = 0;
  let index = -1;
  const len = elements.length;
  for (; i < len; i++) {
    const element = elements[i];
    if (!element || !element.getBoundingClientRect) continue;
    const rect = element.getBoundingClientRect();
    if (rect.height === 0) continue;
    if (rect.top <= top + 1) {
      if (i === len - 1) {
        index = i;
      } else {
        const nexElement = elements[i + 1];
        if (!nexElement || !nexElement.getBoundingClientRect) continue;
        const nextRect = nexElement.getBoundingClientRect();
        if (nextRect.top > top + 1) {
          index = i;
          break;
        }
      }
    }
  }
  return index;
};

const listenerViewChange = () => {
  const data: Array<HTMLElement> = imgData.value
    .map(({ id }) => document.getElementById(id))
    .filter((element) => element !== null) as Array<HTMLElement>;
  readingSection = findReadingSection(data, 220);
};

const tocClass = (index) => {
  let className = `data-toc-item`;
  if (index === readingSection.value) {
    className += " data-toc-item-active";
  }
  return className;
};

onMounted(() => {
  props.editor.on("change", getImgData);
  props.editor.on("afterSetValue", getImgData);
});
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
    margin-bottom: 20px;
    border: 2px solid #f3f2f1;
  }
  .data-toc-item-active,
  .data-toc-item:hover,
  .data-toc-item:focus {
    text-decoration: none;
    border: 2px solid #1890ff;
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
