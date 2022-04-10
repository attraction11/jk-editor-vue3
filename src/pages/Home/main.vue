<template>
  <div class="absolute overflow-hidden -inset-0">
    <div class="absolute inset-y-0 w-64 bg-gray-50">
      <div class="h-6 ml-8 mt-8 cusor-pointer bg-no-repeat bg-[url('https://docs.gtimg.com/docs-design-resources/pc/svg/list_logo-27e58348b7.svg')]" />
      <div class="mt-5 overflow-y-hidden h-[calc(100%_-_105px)]">
        <div class="max-h-full min-h-40 text-sm cursor-pointer">
          <template
            v-for="item in siderList"
            :key="item.value"
            @click="onSiderClick(item.value)"
          >
            <div
              v-if="item.value === 'recycle'"
              class="h-px mx-8 my-3 bg-gray-200"
            />
            <div
              class="mb-2.5 h-10 px-4 hover:bg-gray-100 flex items-center"
              :class="selectSider === item.value ? 'bg-gray-200' : ''"
            >
              <div class="w-3" />
              <div class="flex flex-1 items-center">
                <SvgIcon
                  class="w-6 h-6"
                  :name="selectSider === item.value ? item.selIcon : item.icon"
                />
                <span class="pl-2">{{ item.label }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="flex flex-col h-full ml-64 relative">
      <div class="pt-6 px-10 pb-5 flex justify-between">
        <div class="flex items-center relative">
          <div class="flex justify-between items-center ">
            <div class="flex relative">
              <template
                v-for="item in headerBtns"
                :key="item.icon"
              >
                <button
                  :class="[item.bgColor, item.hoverBgColor, item.color, item.opacity]"
                  @click="onBthClick(item.icon)"
                  class="h-9 flex items-center rounded cursor-pointer text-sm justify-center leading-9 mr-4 w-26  "
                >
                  <SvgIcon
                    :class="[`w-${item.iconWidth}`, `h-${item.iconWidth}`, 'mr-1']"
                    :name="item.icon"
                  />
                  {{ item.label }}
                </button>
              </template>
              <div class="absolute opacity-0 p-3.5 bg-white border border-gray-50 rounded shadow-md box-border left-0 top-11  translate-y-4 duration-100 ease-in invisible w-72 z-10 " />
            </div>
          </div>
          <div
            class="absolute top-11 bg-white border border-gray-100 rounded shadow-sm p-3.5  duration-100 ease-in w-72 z-10"
            :class="visible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'"
          >
            <ul class="flex flex-row flex-nowrap">
              <li class="w-1/3 flex flex-col h-20 justify-center items-center py-1">
                <div class="h-9 w-9">
                  <img :src="fileDoc">
                </div>
                <div class="text-black text-opacity-60 text-xs">
                  在线文档
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="flex items-center"
        >
          <vue-custom-tooltip
            label="通知中心"
          >
            <SvgIcon
              name="icon_notice"
              class="w-7 h-7 mr-8 p-1 cursor-pointer hover:bg-gray-100"
            />
          </vue-custom-tooltip>

          <vue-custom-tooltip
            label="更多操作"
          >
            <SvgIcon
              name="icon_operation"
              class="w-8 h-8 mr-8 p-1 cursor-pointer hover:bg-gray-100"
            />
          </vue-custom-tooltip>
          <!-- <img src="~/icons/icon_notice.svg"/> -->

          <img
            class="w-8 h-8 p-1  cursor-pointer hover:bg-gray-100"
            :src="userImg"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
import { ref, onMounted } from 'vue'
import { fetchHomeDocs } from '~/api/home'
import userImg from '~/icons/svg/icon_portrait.svg'

import fileDoc from '~/icons/svg/icon_file_doc.svg'
import fileImport from '~/icons/svg/icon_import.svg'

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>([])

const selectSider = ref<string>('home')
const docSearchValue = ref<string>('')
const modalSearchValue = ref<string>('')
const visible = ref<boolean>(false)
const dataSource = ref([])
const modalCardList = ref([])

const newFileList = [{
  label: '在线文档',
  icon: fileDoc
}, {
  label: '导入文件',
  icon: fileImport
}]

const siderList = [{
  label: '首页',
  value: 'home',
  icon: 'icon_home',
  selIcon: 'icon_home_sel'
}, {
  label: '我的文档',
  value: 'docs',
  icon: 'icon_docs',
  selIcon: 'icon_docs'
}, {
  label: '回收站',
  value: 'recycle',
  icon: 'icon_delete',
  selIcon: 'icon_delete_sel'
}]

const headerBtns = [{
  label: '新建',
  color: 'text-white',
  icon: 'list_new',
  iconWidth: '3',
  bgColor: 'bg-headerThemeButtonBg',
  hoverBgColor: 'hover:bg-headerThemeButtonHoverBg'
}, {
  label: '导入',
  color: 'text-black',
  icon: 'list_import',
  iconWidth: '6',
  opacity: 'text-opacity-80',
  bgColor: 'bg-headerButtonBg',
  hoverBgColor: 'hover:bg-headerButtonHoverBg'
}, {
  label: '模板',
  color: 'text-black',
  icon: 'icon_templates',
  iconWidth: '6',
  opacity: 'text-opacity-80',
  bgColor: 'bg-headerButtonBg',
  hoverBgColor: 'hover:bg-headerButtonHoverBg'
}]

const operationIcons = ['icon_notice', 'icon_operation']

// 事件处理
const onDocSearch = (value: string) => {
  console.log('or use this.value', docSearchValue.value)
}

const onMenuSelect = (status: string) => {
  const result = fetchHomeDocs({ status })
  dataSource.value = result.list
}

const onSiderClick = (value: string) => {
  selectSider.value = value
}

const onBthClick = (value: string) => {
  if (value !== 'list_new') return
  visible.value = !visible.value
}

// 生命周期钩子
onMounted(async () => {
  const result = await fetchHomeDocs()
  dataSource.value = result.list
})
</script>
