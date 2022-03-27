<template>
  <a-menu
    style="width: 200px"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleClick"
  >
    <a-menu-item key="1">
      <template #icon>
        <DesktopOutlined />
      </template>
      主页
    </a-menu-item>
    <a-sub-menu
      key="sub1"
      @titleClick="titleClick"
    >
      <template #icon>
        <FolderOutlined />
      </template>
      <template #title>
        我的空间
      </template>
      <a-menu-item key="2">
        项目文档
      </a-menu-item>
      <a-menu-item key="3">
        会议文档
      </a-menu-item>
    </a-sub-menu>
    <a-menu-item key="4">
      <template #icon>
        <DeleteOutlined />
      </template>
      回收站
    </a-menu-item>
  </a-menu>
</template>
<script setup lang="ts" name="MenuItem">
import { ref, watch } from 'vue'
import { DesktopOutlined, FolderOutlined, DeleteOutlined } from '@ant-design/icons-vue'

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>([])
const handleClick = (e: Event) => {
  console.log('click', e)
}
const titleClick = (e: Event) => {
  console.log('titleClick', e)
}
watch(
  () => openKeys,
  (val) => {
    console.log('openKeys', val)
  }
)
</script>
