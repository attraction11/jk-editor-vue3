<template>
  <div class="editor-wrap">
    <header class="h-11 w-full shadow-sm bg-themePrimary"></header>
    <div class="flex">
      <ul class="menu-wrap p-1 mb-0 bg-neutralLight border-r border-neutralQuaternaryAlt">
        <template
          v-for="item in menuList"
          :key="item.key"
        >
          <li
            class="mt-2 mb-4 p-1 cursor-pointer hover:bg-gray-300 border-l-2"
            :class="item.key === selectMenu ? 'border-themePrimary' : 'border-neutralLight'"
            @click="onMenuClick(item.key)"
          >
            <img
              class="h-5"
              :src="item.icon"
            >
          </li>
        </template>
      </ul>
      <div
        v-show="showList"
        class="w-56 bg-neutralLighter"
      >
        <ul class="h-full mx-1 h-9 p-1 text-black text-opacity-70 text-sm flex">
          <template
            v-for="item in tabList"
            :key="item.key"
          >
            <li
              class="cursor-pointer "
              @click="onTabClick(item.key)"
            >
              <div
                class="border-b-2 px-2 py-1"
                :class="
                  item.key === selectTab ? 'border-themePrimary' : 'border-neutralQuaternaryAlt'
                "
              >
                {{ item.label }}
              </div>
            </li>
          </template>
        </ul>
        <div
          v-show="selectTab === 'title'"
          class="p-2"
        >
          <Directory
            v-if="engine"
            :editor="engine"
          />
        </div>
        <div class="p-2">
          <ImgList
            v-if="engine"
            :editor="engine"
          />
        </div>
      </div>
      <div
        class="editor-content-wrap"
        :style="editorWidth"
      >
        <AmToolbar
          v-if="engine"
          :engine="engine"
          :items="toolbarItems"
        />
        <div :class="['editor-wrapper', { 'editor-mobile': isMobile }]">
          <div class="editor-container text-left">
            <div class="editor-content">
              <div ref="container" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-56 bg-neutralLighter relative"
        v-show="showReviseRecord || showCommentRecord"
      >
        <ReviseRecord v-show="showReviseRecord" />
        <CommentRecord v-show="showCommentRecord" />
        <img
          :src="iconClose"
          class="absolute right-1 top-1 cursor-pointer w-5 h-5  "
          alt=""
          @click="onCloseClick(false, false)"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RedaxeEditor">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import Engine, {
  $,
  EngineInterface,
  ChangeInterface,
  isMobile
} from '@aomao/engine'
import AmToolbar, { GroupItemProps } from '@aomao/toolbar-vue'
import { cards, plugins, pluginConfig } from './config'
import { getDefaultToolbarItems, getDefaultStyle } from './default'
import defaultContent from '~/document/intelliDoc'
import { StyleOption, NODES, Message, ChangePayload } from './types'
import ReviseRecord from '~/pages/revise-record/index.vue'
import CommentRecord from '~/pages/comment-record/index.vue'
import fileDoc from '~/icons/svg/icon_file_doc.svg'
import iconClose from '~/icons/svg/icon_close.svg'
import iconRevise from '~/icons/svg/icon_revise.svg'
import iconComment from '~/icons/svg/icon_comment.svg'
import Directory from './directory.vue'
import ImgList from './imgList.vue'

import { getDocSave } from '~/api/home'

const showList = ref<boolean>(false)
const showReviseRecord = ref<boolean>(false)
const showCommentRecord = ref<boolean>(false)
const saveLoading = ref<boolean>(false)
const saveResult = ref<string>('')
const selectMenu = ref<string>('doc1')
const selectTab = ref<string>('title')

const menuList = [
  {
    key: 'doc1',
    icon: fileDoc
  },
  {
    key: 'doc2',
    icon: fileDoc
  },
  {
    key: 'doc3',
    icon: fileDoc
  }
]

const tabList = [
  {
    key: 'title',
    label: '标题'
  },
  {
    key: 'image',
    label: '图片'
  }
]

const editorWidth = computed(() => {
  const width = (showReviseRecord.value || showCommentRecord.value) ? 224 : 0
  return {
    width: `calc(${100}% - ${44}px - ${showList.value ? 224 : 0}px - ${width}px)`
  }
})

const handleDocSave = () => {
  saveLoading.value = true
  getDocSave()
    .then((resp) => {
      saveLoading.value = false
      if (resp.data.code !== '0') {
        saveResult.value = '保存成功'
      }
      saveResult.value = '保存失败'
    })
    .catch((error) => {
      console.log('error: ', error)
    })
}

interface IProps {
  modelValue?: string;
  styleOption?: Partial<StyleOption>;
  items?: GroupItemProps[];
  customToolbarItems?: GroupItemProps;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: defaultContent,
  items: () => getDefaultToolbarItems(isMobile),
  customToolbarItems: () => [],
  styleOption: () => ({})
})

const styles = ref<StyleOption>({ ...getDefaultStyle(), ...props.styleOption })

const toolbarItems = ref<GroupItemProps[]>([
  ...props.items,
  props.customToolbarItems
])

const emit = defineEmits<{
  (type: 'update:modelValue', change: string): void;
  (type: 'change', change: ChangePayload): void;
  (event: 'changeHTML', content: string): void;
  (event: 'changeJSON', content: NODES): void;
  (event: 'onSelect', change: ChangeInterface): void;
  (event: 'confirm', message: string): Promise<boolean>;
  (event: 'message', message: Message): void;
}>()

// 编辑器容器
const container = ref<HTMLElement | null>(null)
// 编辑器引擎
const engine = ref<EngineInterface | null>(null)
// 默认设置为当前在加载中
const loading = ref(true)

defineExpose({
  engine,
  container
})

const onMenuClick = (value: string) => {
  selectMenu.value = value
  if (value === 'doc1') {
    showList.value = !showList.value
  } else {
    showList.value = false
  }
}

const onTabClick = (value: string) => {
  selectTab.value = value
}

const onCloseClick = (value1: boolean, value2: boolean) => {
  showReviseRecord.value = value1
  showCommentRecord.value = value2
}
// 处理文章段落的编辑权限
const initEngineRole = () => {
  const selectRoot = document.querySelector('div.am-engine')
  selectRoot.setAttribute('contenteditable', false)
  selectRoot.style.userSelect = 'none'

  const selectNode = document.querySelector(
    'div.am-engine p[data-id="pd157317-H6Mh85v2"]'
  )
  selectNode.setAttribute('contenteditable', true)
  selectNode.style.userSelect = ''

  const span = document.createElement('span')
  const iconList = `<img title="修订" class="revise" data-id="pd157317-H6Mh85v2" src='${iconRevise}' style="position: absolute;right: -10px;bottom: 4px;cursor: pointer; width: 16px; height: 16px;">
                    <img title="评论" class="comment" data-id="pd157317-H6Mh85v2" src='${iconComment}' style="position: absolute;right: 28px;bottom: 2px;cursor: pointer; width: 18px; height: 18px;">`
  span.innerHTML = iconList

  selectNode.style.position = 'relative'
  selectNode.appendChild(span)
}

onMounted(() => {
  // 容器加载后实例化编辑器引擎
  if (container.value) {
    // 实例化引擎
    const engineInstance = new Engine(container.value, {
      // 启用的插件
      plugins,
      // 启用的卡片
      cards,
      // 所有的卡片配置
      config: pluginConfig
      // 是否只读
      // readonly: true,
    })
    // 设置显示成功消息UI，默认使用 console.log
    engineInstance.messageSuccess = (msg: string) => {
      emit('message', { type: 'success', msg })
    }
    // 设置显示错误消息UI，默认使用 console.error
    engineInstance.messageError = (error: string) => {
      emit('message', { type: 'error', msg: error })
    }

    // 设置显示确认消息UI，默认无
    engineInstance.messageConfirm = (msg: string) => {
      return new Promise((resolve, reject) => {
        emit('confirm', msg).then(resolve, reject)
      })
    }
    // 卡片最大化时设置编辑页面样式
    engineInstance.on('card:maximize', () => {
      $('.editor-toolbar').css('z-index', '9999').css('top', '55px')
    })
    engineInstance.on('card:minimize', () => {
      $('.editor-toolbar').css('z-index', '').css('top', '')
    })
    // 默认编辑器值，为了演示，这里初始化值写死，正式环境可以请求api加载

    const value = props.modelValue
    // 使用协同编辑，需要安装 mongodb 数据库，并且配置 ot-server/client 中的数据库连接，最后 yarn start 启动 ot-server 服务

    // 非协同编辑，设置编辑器值，异步渲染后回调
    engineInstance.setValue(value, () => {
      loading.value = false
    })

    // 监听编辑器值改变事件
    engineInstance.on('change', () => {
      emit('change', {
        html: engineInstance.getHtml(),
        json: engineInstance.getJsonValue()
      })
      emit('update:modelValue', engineInstance.getHtml())
      emit('changeHTML', engineInstance.getHtml())
      emit('changeJSON', engineInstance.getJsonValue())
    })

    engineInstance.on('select', () => {
      emit('onSelect', engineInstance.change)
    })

    initEngineRole()
    engine.value = engineInstance
  }
})

onMounted(() => {
  $('img[data-id="pd157317-H6Mh85v2"].revise').on('click', () => {
    showCommentRecord.value = false
    showReviseRecord.value = true
  })

  $('img[data-id="pd157317-H6Mh85v2"].comment').on('click', () => {
    showReviseRecord.value = false
    showCommentRecord.value = true
  })
})

onUnmounted(() => {
  if (engine.value) engine.value.destroy()
})
</script>

<style css scoped>
.editor-wrap ul.menu-wrap li{
  width:36px
}
.editor-ot-users {
  font-size: 12px;
  background: #fff;
  padding: 0px 0 8px 266px;
  z-index: 999;
  width: 100%;
}

.editor-ot-users-content {
  display: flex;
  flex-wrap: wrap;
}

.editor-toolbar {
  background: #ffffff;
  z-index: 1000;
}
.editor-toolbar .toolbar-button {
  font-size: 14px;
  color: #666;
}
.editor-wrapper {
  height: calc(var(--vh, 1vh) * 100 - 80px);
  overflow: auto;
}

.editor-wrapper.editor-mobile {
  min-width: auto;
}

.editor-container {
  background: transparent;
  height: 100%;
  margin: 0 auto;
}

.editor-mobile .editor-container {
  padding: 0;
  height: auto;
}

.editor-content {
  height: 100%;
  background: white;
  overflow-y: auto;
}

.editor-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  /**/
}
.editor-content::-webkit-scrollbar-track {
  background: white;
  border-radius: 2px;
}
.editor-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 6px;
}

.editor-mobile .editor-content {
  width: auto;
  border: 0 none;
}

.editor-content .am-engine {
  padding: 20px 40px;
  height: 100%;
  font-family: 'SimSun, 宋体, "Songti SC", NSimSun, STSong, serif';
}

.editor-mobile .editor-content .am-engine {
  padding: 18px 0 0 0;
  font-family: 'SimSun, 宋体, "Songti SC", NSimSun, STSong, serif';
}
</style>
