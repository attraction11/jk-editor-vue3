<template>
  <div class="editor-wrap">
    <div class="editor-header">
      <div class="doc-wrap">
        <a
          href="/"
          class="logo"
        >
          <img
            :src="logo"
            alt=""
          >
        </a>
        <div class="doc-topic">
          <div class="title">
            研发环境部署
          </div>
          <div class="sub-title">
            技术文档 | 研发部
          </div>
        </div>
      </div>
      <ul class="operate">
        <li>
          <img
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          >
        </li>
      </ul>
    </div>
    <div class="editor-body">
      <ul class="editor-sider">
        <li>
          目录
        </li>
        <li>
          邮件
        </li>
        <li>
          历史
        </li>
      </ul>
      <Directory
        v-if="engine"
        v-show="showList"
        :editor="engine"
      />
      <div class="editor-content">
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
      <div class="revise-sider">
        <ReviseRecord />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RedaxeEditor">
import { onMounted, onUnmounted, ref } from 'vue'
import logo from '~/assets/logo.svg'
import ReviseRecord from '~/pages/revise-record/index.vue'
import Engine, { $, EngineInterface, ChangeInterface, isMobile } from '@aomao/engine'
import AmToolbar, { GroupItemProps } from '@aomao/toolbar-vue'
import { cards, plugins, pluginConfig } from './config'
import { getDefaultToolbarItems, getDefaultStyle } from './default'
import defaultContent from '~/document/intelliDoc'
import { StyleOption, NODES, Message, ChangePayload } from './types'
import Directory from './directory.vue'

import { getDocSave } from '~/api/home'

const showList = ref<boolean>(false)
const saveLoading = ref<boolean>(false)
const saveResult = ref<string>('')

const handleDocSave = () => {
  saveLoading.value = true
  getDocSave().then(resp => {
    saveLoading.value = false
    if (resp.data.code !== '0') {
      saveResult.value = '保存成功'
    }
    saveResult.value = '保存失败'
  }).catch(error => {
    console.log('error: ', error)
  })
}

const handleMenuClick = ({ item, key, keyPath }) => {
  showList.value = showList.value ? false : key === 'list'
}

interface IProps {
  modelValue?: string
  styleOption?: Partial<StyleOption>
  items?: GroupItemProps[]
  customToolbarItems?: GroupItemProps
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: defaultContent,
  items: () => getDefaultToolbarItems(isMobile),
  customToolbarItems: () => [],
  styleOption: () => ({})
})

const styles = ref<StyleOption>({ ...getDefaultStyle(), ...props.styleOption })

const toolbarItems = ref<GroupItemProps[]>([...props.items, props.customToolbarItems])

const emit = defineEmits<{
  (type: 'update:modelValue', change: string): void
  (type: 'change', change: ChangePayload): void
  (event: 'changeHTML', content: string): void
  (event: 'changeJSON', content: NODES): void
  (event: 'onSelect', change: ChangeInterface): void
  (event: 'confirm', message: string): Promise<boolean>
  (event: 'message', message: Message): void
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

// 处理文章段落的编辑权限
const initEngineRole = () => {
  const selectRoot = document.querySelector('div.am-engine')
  selectRoot.setAttribute('contenteditable', false)
  selectRoot.style.userSelect = 'none'

  const selectNode = document.querySelector('div.am-engine p[data-id="p6666-a002"]')
  selectNode.setAttribute('contenteditable', true)
  selectNode.style.userSelect = ''

  const span = document.createElement('span')
  span.innerHTML = '<svg style="position: absolute;right: -15px;bottom: 4px;cursor: pointer; width: 20px; height: 20px;" t="1648298084608" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2196" width="200" height="200"><path d="M785.066667 416H381.866667v-121.6c0-74.666667 61.866667-134.4 138.666666-134.4 59.733333 0 113.066667 36.266667 132.266667 91.733333 6.4 17.066667 23.466667 25.6 40.533333 19.2 17.066667-6.4 25.6-23.466667 19.2-40.533333-27.733333-81.066667-104.533333-134.4-192-134.4-110.933333 0-202.666667 89.6-202.666666 198.4v121.6h-78.933334c-55.466667 0-100.266667 44.8-100.266666 100.266667v311.466666c0 55.466667 44.8 100.266667 100.266666 100.266667h546.133334c55.466667 0 100.266667-44.8 100.266666-100.266667V516.266667c0-55.466667-44.8-100.266667-100.266666-100.266667z m36.266666 411.733333c0 19.2-17.066667 36.266667-36.266666 36.266667H238.933333c-19.2 0-36.266667-17.066667-36.266666-36.266667V516.266667c0-19.2 17.066667-36.266667 36.266666-36.266667h546.133334c19.2 0 36.266667 17.066667 36.266666 36.266667v311.466666z" p-id="2197"></path><path d="M512 544c-17.066667 0-32 14.933333-32 32v106.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-106.666667c0-17.066667-14.933333-32-32-32z" p-id="2198"></path></svg>'

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

    // initEngineRole()
    engine.value = engineInstance
  }
})

onUnmounted(() => {
  if (engine.value) engine.value.destroy()
})
</script>

<style scoped lang="less">
.editor-wrap {
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background: #fff;
  position: relative;
  .editor-body {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    color: #fff;
  }
}
</style>

<style css scoped>
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
  /* transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%); */
  z-index: 1000;
}
.editor-toolbar .toolbar-button {
  font-size: 14px;
  color: #666;
}
.editor-wrapper {
  width: 100%;
  height: calc(100% - 36px);
  overflow: auto;
}

@media screen and (max-width: 1401px) {
  .editor-wrapper {
    height: calc(100% - 72px);
  }
}

.editor-wrapper.editor-mobile {
  min-width: auto;
}

.editor-container {
  background: transparent;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.editor-mobile .editor-container {
  padding: 0;
  height: auto;
}

.editor-content {
  height: v-bind(styles.height);
  padding: v-bind(styles.padding);
  background: v-bind(styles.background);
  overflow-y: v-bind(styles.overflowY);
  /* min-height: v-bind(styles.minHeight); */
}

.editor-content::-webkit-scrollbar{
  width:6px;
  height:6px;
  /**/
}
.editor-content::-webkit-scrollbar-track{
  background: white;
  border-radius:2px;
}
.editor-content::-webkit-scrollbar-thumb{
  background: #c1c1c1;
  border-radius:6px;
}

.editor-mobile .editor-content {
  width: auto;
  /* min-height: calc(100vh - 68px); */
  border: 0 none;
}

.editor-content .am-engine {
  padding: 20px 40px;
  height: v-bind(styles.height);
  font-family: v-bind(styles.fontFamily);
}

.editor-mobile .editor-content .am-engine {
  padding: 18px 0 0 0;
  font-family: v-bind(styles.fontFamily);
}
</style>
