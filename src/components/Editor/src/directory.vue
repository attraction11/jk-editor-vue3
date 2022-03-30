<template>
  <div class="directory-wrap">
    <div class="title">
      目录
    </div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane
        key="1"
        tab="标题"
      >
        标题
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
import { ref } from 'vue'
const activeKey = ref<string>('1')
</script>

<style  lang="less">
.directory-wrap{
  width: 300px;
  height: 100%;
  background-color: #353e42;
  .title{
    height: 30px;
    line-height: 30px;
    padding: 12px 15px 0;
  }
  .ant-tabs{
    font-size: 12px;
    padding: 0 15px;
    color: white;
    .ant-tabs-nav .ant-tabs-tab{
      font-size: 12px;
      padding: 12px 6px 12px 12px;
      margin: 0 12px 0 0;
    }
  }
}
</style>
