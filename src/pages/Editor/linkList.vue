<template>
  <div class="data-toc">
    <a
      v-for="(item, index) in linkData"
      :key="item.id"
      href="void()"
      :class="tocClass(index)"
      @click="onListClick($event, item.href)"
      >{{ item.innerText }}</a
    >
  </div>
</template>

<script setup lang="ts" name="linkList">
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
const linkData = ref([]);

const getlinkData = () => {
  // 从编辑区域提取符合结构要求的标题 Dom 节点
  const nodes: Array<Element> = [];

  props.editor.container.find('.am-engine a[target="_blank"]').each((child) => {
    const node = $(child);
    nodes.push(node.get<Element>()!);
  });
  linkData.value = nodes;
};

const onListClick = (e, href) => {
  //
  e = e || window.event;
  e.preventDefault();
  const top = document
    .querySelector(`.am-engine a[target="_blank"][href="${href}"]`)
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
  const data: Array<HTMLElement> = linkData.value
    .map(({ id }) => document.getElementById(id))
    .filter((element) => element !== null) as Array<HTMLElement>;
  readingSection = findReadingSection(data, 220);
};

const tocClass = (index) => {
  let className = "data-toc-item";
  if (index === readingSection.value) {
    className += " data-toc-item-active";
  }
  return className;
};

onMounted(() => {
  props.editor.on("change", getlinkData);
  props.editor.on("afterSetValue", getlinkData);
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
    border: 2px solid #f3f2f1;
  }
  .data-toc-item-active,
  .data-toc-item:hover,
  .data-toc-item:focus {
    text-decoration: none;
    color: #1890ff;
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
