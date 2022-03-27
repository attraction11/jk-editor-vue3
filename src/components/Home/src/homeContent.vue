<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :custom-row="rowClick"
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script setup lang="ts" name="MenuContent">
import { useRouter } from 'vue-router'

const router = useRouter()

const columns = [
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    slots: { customRender: 'type' }
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    key: 'owner'
  },
  {
    title: '描述',
    dataIndex: 'describe',
    key: 'describe 1',
    ellipsis: true
  }
]

const dataSource = [
  {
    key: '1',
    type: '项目里程碑流程图',
    owner: 'xiaogong',
    describe: '通过流程图，可视化展示项目里程碑关键信息'
  },
  {
    key: '2',
    type: '个人工作学习周计划',
    owner: 'xiaogong',
    describe: '计划的制定比计划本身更为重要。 —— 戴尔·麦康基'
  },
  {
    key: '3',
    type: '会议记录 (简洁版) ',
    owner: 'heyan',
    describe:
      '会议主题：简要描述会议主题和目标。参会人：输入“@+人名”插入参会人员会前必读：输入@ 插入相关背景资料'
  }
]

function onDelete (key) {
  const dataSource = [...this.dataSource]
  this.dataSource = dataSource.filter(item => item.key !== key)
}

function rowClick (record, index) {
  return {
    onClick: (event) => {
      console.log('event: ', 'goto docs...')
      router.push({ path: '/docs' }).catch((err) => {
        console.warn(err)
      })
    }
  }
}
</script>
<style scoped lang="less">
.ant-table-wrapper {
  & ::v-deep(.ant-table-tbody) {
    cursor: pointer !important;
  }
}
</style>
