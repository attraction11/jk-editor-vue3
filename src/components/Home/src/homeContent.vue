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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getHomeDocs } from '~/api/home'

const router = useRouter()

const columns = [
  {
    title: '文件名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    ellipsis: true
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    key: 'creator'
  },
  {
    title: '修改者',
    dataIndex: 'modifier',
    key: 'modifier'
  }
]

// 模拟数据
let dataSource = [
  {
    id: 'xxxxx',
    key: 'xxxxx',
    name: 'test',
    creator: 'xxxx',
    modifier: 'xxxx',
    createTime: 1231312323,
    modifyTime: 12312312323,
    content: '文本内容...',
    folderId: '11111111111',
    type: 'document'
  },
  {
    id: 'yyyyy',
    key: 'yyyyy',
    name: 'test',
    creator: 'xxxx',
    modifier: 'xxxx',
    createTime: 1231312323,
    modifyTime: 12312312323,
    content: '文本内容...',
    folderId: '11111111111',
    type: 'document'
  },
  {
    id: 'zzzzz',
    key: 'zzzzz',
    name: 'test',
    creator: 'xxxx',
    modifier: 'xxxx',
    createTime: 1231312323,
    modifyTime: 12312312323,
    content: '文本内容...',
    folderId: '11111111111',
    type: 'document'
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

const handleDocsList = async () => {
  dataSource = await getHomeDocs()
}

onMounted(() => {
  // handleDocsList()
})
</script>

<style scoped lang="less">
.ant-table-wrapper {
  & ::v-deep(.ant-table-tbody) {
    cursor: pointer !important;
  }
}
</style>
