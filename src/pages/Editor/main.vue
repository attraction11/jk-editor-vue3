<template>
  <div class="editor-wrap">
    <header class="h-11 w-full shadow-sm bg-themePrimary flex justify-between  items-center ">
      <div class="ml-4 text-gray-200   ">
        {{ saveLoading ? '保存中...' : '已经保存' }}
      </div>

      <div class="flex items-center ">
        <div class="form-check form-switch">
          <input
            class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
            type="checkbox"
            role="switch"
            :disabled="isRevise"
            v-model="isRevise"
            id="flexSwitchCheckDefault"
          >
          <label
            class="form-check-label inline-block text-white"
            for="flexSwitchCheckDefault"
          >开启修订</label>
        </div>
        <span
          @click="onSaveDoc"
          class="text-white px-8 cursor-pointer  "
        >保存文档</span>
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          class="rounded-full w-8 h-8 mr-4 cursor-pointer"
          alt="Avatar"
        >
      </div>
    </header>
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
        <ul class="h-full mx-1 mb-2 h-9 p-1 text-black text-opacity-70 text-sm flex">
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
        <div
          v-show="selectTab === 'image'"
          class="p-2"
        >
          <ImgList
            v-if="engine"
            :editor="engine"
          />
        </div>
        <div
          v-show="selectTab === 'link'"
          class="p-2"
        >
          <linkList
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
        <ReviseRecord
          v-show="showReviseRecord"
          :records="records"
        />
        <CommentRecord
          v-show="showCommentRecord"
          :comments="comments"
        />
        <img
          :src="iconClose"
          class="absolute right-1 top-1 cursor-pointer w-5 h-5"
          alt=""
          @click="onCloseClick(false, false)"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RedaxeEditor">
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue'
import Engine, {
  $,
  EngineInterface,
  ChangeInterface,
  isMobile
} from '@aomao/engine'
import AmToolbar, { GroupItemProps } from '@aomao/toolbar-vue'
import { cards, plugins, pluginConfig } from './config'
import { getDefaultToolbarItems, getDefaultStyle } from './default'
import defaultContent from '~/document/contract'
import { StyleOption, NODES, Message, ChangePayload } from './types'
import ReviseRecord from '~/pages/revise-record/index.vue'
import CommentRecord from '~/pages/comment-record/index.vue'
import fileDoc from '~/icons/svg/icon_file_doc.svg'
import iconClose from '~/icons/svg/icon_close.svg'
import iconRevise from '~/icons/svg/icon_revise.svg'
import iconComment from '~/icons/svg/icon_comment.svg'
import iconLock from '~/icons/svg/icon_lock.svg'
import Directory from './directory.vue'
import ImgList from './imgList.vue'
import linkList from './linkList.vue'

import { getDocSave, getDocBody } from '~/api/home'

const showList = ref<boolean>(false)
const isRevise = ref<boolean>(false)
const showReviseRecord = ref<boolean>(false)
const showCommentRecord = ref<boolean>(false)
const saveLoading = ref<boolean>(false)
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
  },
  {
    key: 'link',
    label: '链接'
  }
]

const editorWidth = computed(() => {
  const width = (showReviseRecord.value || showCommentRecord.value) ? 224 : 0
  return {
    width: `calc(${100}% - ${44}px - ${showList.value ? 224 : 0}px - ${width}px)`
  }
})

const onSaveDoc = () => {
  // console.log('engine.value: ', engine.value?.getValue());
  saveLoading.value = true
  getDocSave({
    id: 'cf2e3104dd904d96bb8ac27c9892ab67',
    content: engine.value?.getValue(),
    modifier: 'hong'
  }).then((resp) => {
    saveLoading.value = false
  }).catch((error) => {
    console.log('error: ', error)
  })
}

const onDocBody = () => {
  // console.log('container.value: ', String(container.value))
  saveLoading.value = true
  getDocBody({
    id: '文档ID'
  }).then((resp) => {
    saveLoading.value = false
  }).catch((error) => {
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
  // selectRoot.setAttribute('contenteditable', false)
  // selectRoot.style.userSelect = 'none'

  // selectNode.setAttribute('contenteditable', true)
  // selectNode.style.userSelect = ''

  const list = document.querySelectorAll('div.am-engine p')
  const selectAllNode = Array.from(new Set(list))

  for (let i = 0; i < selectAllNode.length; i++) {
    const selectNode = selectAllNode[i]
    const key = selectAllNode[i].dataset.id
    const span = document.createElement('span')

    span.innerHTML = `<img title="评论" class="comment" data-id="${key}" src='${iconComment}' style="position: absolute;right: 40px;bottom: 6px;cursor: pointer; width: 18px; height: 18px; display: none">`

    selectNode.style.position = 'relative'
    // console.log('span----------------->: ', span)
    selectNode.appendChild(span)

    const imgNode = $(`img[data-id="${key}"].comment`)

    imgNode.on('click', () => {
      showReviseRecord.value = false
      showCommentRecord.value = true
    })

    selectNode.addEventListener('focus', () => {
      console.log('段落获取焦点-----focus: ')
      imgNode.style.display = 'block'
      selectNode.style.backgroundColor = '#faf1d1'
    })

    selectNode.addEventListener('blur', () => {
      console.log('段落失去焦点-----blur: ')
      imgNode.style.display = 'none'
      selectNode.style.backgroundColor = 'transparent'
    })
  }

  for (const [key, value] of Object.entries(allLists)) {
    const selectNode = document.querySelector(`div.am-engine p[data-id="${key}"]`)

    const span = document.createElement('span')
    let iconList = ''

    if (value.row_comment) {
      iconList += `<img title="评论" class="comment" data-id="${key}" src='${iconComment}' style="position: absolute;right: 40px;bottom: 6px;cursor: pointer; width: 18px; height: 18px;">`
    }

    if (value.row_history) {
      iconList += `<img title="修订" class="revise" data-id="${key}" src='${iconRevise}' style="position: absolute;right: 10px;bottom: 7px;cursor: pointer; width: 16px; height: 16px;" />`
      // <span style="position: absolute;right: 6px;bottom: 7px; color: red; font-weight: bold;">3</span>`
      // iconList += `<span title="修订" class="revise" data-id="${key}" style="background: url(${iconRevise}); background-size: contain; position: absolute;right: 10px;bottom: 7px;cursor: pointer; width: 16px; height: 16px;"><span style="position: absolute;">3</span></span>`
      // <span style="position: absolute;right: 6px;bottom: 7px; color: red; font-weight: bold;">3</span>`

      // iconList += `<a title="修订" class="revise" data-id="${key}" src='${iconRevise}' style="position: absolute;right: 10px;bottom: 7px;cursor: pointer; width: 18px; height: 18px; border: 1px solid #333;	border-radius: 50%">3</a>`
    }
    if (value.row_purview) {
      selectNode.setAttribute('contenteditable', false)
      selectNode.style.userSelect = 'none'
      iconList += `<img title="已被${value.row_purview.join()}锁定" class="lock" data-id="${key}" src='${iconLock}' style="position: absolute;right: -20px;bottom: 6px;cursor: pointer; width: 20px; height: 20px;">`
    }
    span.innerHTML = iconList

    selectNode.style.position = 'relative'
    selectNode.appendChild(span)

    $(`img[data-id="${key}"].revise`).on('click', () => {
      showCommentRecord.value = false
      showReviseRecord.value = true
    })

    $(`img[data-id="${key}"].comment`).on('click', () => {
      showReviseRecord.value = false
      showCommentRecord.value = true
    })
  }
}

const records = ref([])
const comments = ref([])
const allLists = reactive([])

const loadRecords = async () => {
  records.value = await [
    {
      id: 'p002deaf-4F18GW8L',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_purview: ['user1', 'user2', 'user3', 'user4'],
      row_history: '<p style="text-indent: 2.28571em; line-height: 2.5;" data-id="p002deaf-4F18GW8L"><span style="font-size: 16px;"><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">甲方委托乙方就<u>&nbsp;&nbsp; 综合文档管理应用系统&nbsp;&nbsp; </u>项目进行专项技术服务，并支付技术服务报酬。双方经过平等协商，在真实、充分地表达各自意愿的基础上，根据《中华人民共和国合同法》的规定，达成如下协议，并由双方共同恪守。</span></span></p>',
      row_original: '<p style="text-indent: 2.28571em; line-height: 2.5;" data-id="p002deaf-4F18GW8L"><span style="font-size: 16px;"><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">甲方委托乙方就<u>&nbsp;&nbsp; 综合文档管理应用系统&nbsp;&nbsp; </u>项目进行专项技术服务，并技术服务报酬。双方经过不平等协商，在表达各自意愿的基础上，根据《中华人民共和国合同法》的规定，达成如下协议，并由双方共同恪守。</span></span></p>',
      editor_name: 'user1',
      editor_time: '2022.02.15'
    },
    {
      id: 'p4ca7b43-sg1Kl5bT',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_purview: ['user1', 'user2', 'user3', 'user4'],
      row_history: '<p data-id="p4ca7b43-sg1Kl5bT" style="text-indent: 2.28571em;"><span style="font-size: 16px;"><strong><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">验收</span></strong><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">：是指甲方按照本合同约定的标准对乙方完成的阶段性工作成果和终极工作成果进行考核、检验的活动。</span></span></p>',
      row_original: '<p data-id="p4ca7b43-sg1Kl5bT" style="text-indent: 2.28571em;"><span style="font-size: 16px;"><strong><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">验收</span></strong><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">：是指甲方暗中本合同约定的标准对乙方完成的城市古工作成果和终极工作成果进行、检验的活动。</span></span></p>',
      editor_name: 'user1',
      editor_time: '2022.02.15'
    }
  ]
}

const loadComments = async () => {
  comments.value = await [
    {
      id: 'p4ca7b43-EVIOoLyS',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_comment: '<p style="text-indent: 2.28571em; line-height: 2.5;" data-id="p4ca7b43-EVIOoLyS">这句话有问题~</p>',
      comment_name: 'user1',
      comment_time: '2022.02.15'
    },
    {
      id: 'p4ca7b43-sg1Kl5bT',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_comment: '<p style="text-indent: 2.28571em; line-height: 2.5;" data-id="p4ca7b43-sg1Kl5bT">这句话有问题~</p>',
      comment_name: 'user1',
      comment_time: '2022.02.15'
    }
  ]

  // for (let i = 0; i < comments.value.length; i++) {
  //   const id = comments.value[i].id
  //   const selectNode = document.querySelector(`.am-engine p[data-id=${id}]`)
  //   if (selectNode) {
  //     selectNode.style.textDecoration = 'dashed underline orange'
  //   }
  // }
}

onMounted(async () => {
  await loadComments()
  await loadRecords()
  const arrlist = [...records.value, ...comments.value]
  arrlist.map(item => {
    if (allLists[item.id]) {
      allLists[item.id] = Object.assign(allLists[item.id], item)
    } else {
      allLists[item.id] = item
    }
  })

  console.log('allLists: ', allLists['p4ca7b43-bCqrErwy'])
  initEngineRole()
})

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
        json: engineInstance.getJsonValue(),
      })
      emit('update:modelValue', engineInstance.getHtml())
      emit('changeHTML', engineInstance.getHtml())
      emit('changeJSON', engineInstance.getJsonValue())

      autoSave()
    })

    engineInstance.on('select', () => {
      emit('onSelect', engineInstance.change)
    })

    engine.value = engineInstance
  }
})

const saveTimeout = ref(null)

// 60秒内无更改自动保存
const autoSave = () => {
  if (saveTimeout.value) clearTimeout(saveTimeout.value)
  saveTimeout.value = setTimeout(() => {
    onSaveDoc()
  }, 60000)
}

onUnmounted(() => {
  if (engine.value) engine.value.destroy()
})
</script>

<style scoped>
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

.editor-wrap .form-check-input:checked{
  background-color: #000;
    border-color: #000;
}
</style>
<style>
.editor-content .am-engine p,
.editor-content .am-engine-view p{
  padding-right: 70px !important;
}
.am-engine tr .table-main-content p,
.am-engine-view tr .table-main-content p{
  padding-right: 0px !important;
}
</style>
