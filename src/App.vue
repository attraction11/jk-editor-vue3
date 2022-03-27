<script setup lang="ts" name="App"></script>

<template>
  <RouterView />
</template>
<style css>
body {
  overflow: hidden;
}

/* 需要全局修改才生效 */
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-active,
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: transparent !important;
}
</style>
