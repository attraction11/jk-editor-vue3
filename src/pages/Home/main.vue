<template>
  <div class="absolute overflow-hidden -inset-0">
    <div class="absolute inset-y-0 w-64 bg-gray-100">
      <div class="h-6 ml-8 mt-8 cusor-pointer bg-no-repeat bg-[url('https://docs.gtimg.com/docs-design-resources/pc/svg/list_logo-27e58348b7.svg')]" />
      <div class="mt-5 overflow-y-hidden h-[calc(100%_-_105px)]">
        <div class="max-h-full min-h-40">
          <div class="mb-2.5 h-10 px-4">
            <div class="w-3"></div>
            <div class="flex flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
import { ref, onMounted } from 'vue'
import logo from '~/assets/logo.svg'
// import Dialog from '~/components/Dialog'
import HomeContent from './homeContent.vue'
import ModalCard from './modalCard.vue'
import { fetchHomeDocs } from '~/api/home'
import { Home, Delete } from '@icon-park/vue-next'

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>([])

const docSearchValue = ref<string>('')
const modalSearchValue = ref<string>('')
const visible = ref<boolean>(false)
const dataSource = ref([])
const modalCardList = ref([])

// 模拟模板列表数据
modalCardList.value = [
  {
    id: '1',
    title: '技术服务合同',
    description: `会议主题：简要描述会议主题和目标。
    参会人：输入“@+人名”插入参会人员。
    会前必读：输入@ 插入相关背景资料。`
  },
  {
    id: '2',
    title: 'IntelliDocs产品需求',
    description: `编制产品需求说明书的主要目的是为了定义IntelliDocs产品的功能特性，
    对产品的应用设计与开发提供必要的前提，对产品的数据模型设计、
    技术架构设计与开发提供相应的参考，是评价IntelliDocs产品建设成果的基本依据`
  }
]

// 事件处理
const onDocSearch = (value: string) => {
  console.log('or use this.value', docSearchValue.value)
}

const onMenuSelect = (status: string) => {
  const result = fetchHomeDocs({ status })
  dataSource.value = result.list
}

// 生命周期钩子
onMounted(async () => {
  const result = await fetchHomeDocs()
  dataSource.value = result.list
})
</script>
