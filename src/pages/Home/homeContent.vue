<template>
  <vxe-table
    border
    keep-source
    @cell-click="cellClickEvent"
    :row-config="{isHover: true}"
    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    :data="props.source"
  >
    <vxe-column
      type="checkbox"
      width="80"
    />
    <vxe-column
      type="seq"
      title="Number"
      width="80"
    />
    <vxe-column
      field="name"
      title="Name"
      sortable
      :edit-render="{name: 'input', attrs: {type: 'text'}}"
    />
    <vxe-column
      field="sex"
      title="Sex"
      sortable
      :edit-render="{name: 'input', attrs: {type: 'text'}}"
    >
      <template #default="{ row }">
        <span style="color: blue">{{ row.sex }}</span>
      </template>
    </vxe-column>
    <vxe-column
      field="address"
      title="Address"
    >
      <template #default="{ row }">
        <span style="color: red">{{ row.address }}</span>
      </template>
    </vxe-column>
  </vxe-table>
</template>
<script setup lang="ts" name="MenuContent">
import { useRouter } from 'vue-router'

const props = defineProps({
  source: {
    type: Array,
    required: true
  }
})

// hook函数
const router = useRouter()

// 事件处理
const cellClickEvent = (record, index) => {
  return {
    onClick: (event) => {
      router.push({ path: '/docs' }).catch((err) => {
        console.warn(err)
      })
    }
  }
}

</script>

<style scoped lang="less">
</style>
