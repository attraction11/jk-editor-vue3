<template>
  <div class="editor-wrap">
    <header
      class="h-11 w-full shadow-sm bg-themePrimary flex justify-between items-center"
    >
      <div class="ml-4 text-gray-200 flex">
        <span class="w-40 h-9 leading-9 text-base truncate mr-6">东方启明投资综合文档管理应用系统项目技术服务合同</span>
        <span class="h-9 leading-9">{{
          saveLoading ? "保存中..." : "已经保存"
        }}</span>
      </div>
      <div class="flex items-center">
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
          class="text-white px-8 cursor-pointer"
        >保存文档</span>
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          class="rounded-full w-8 h-8 mr-4 cursor-pointer"
          alt="Avatar"
        >
      </div>
    </header>
    <div class="flex">
      <ul
        class="menu-wrap p-1 mb-0 bg-neutralLight border-r border-neutralQuaternaryAlt"
      >
        <template
          v-for="item in menuList"
          :key="item.key"
        >
          <li
            class="mt-2 mb-4 p-1 cursor-pointer hover:bg-gray-300 border-l-2"
            :class="
              item.key === selectMenu
                ? 'border-themePrimary'
                : 'border-neutralLight'
            "
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
        class="w-64 bg-neutralLighter"
      >
        <ul class="mx-1 mb-2 h-9 p-1 text-black text-opacity-70 text-sm flex">
          <template
            v-for="item in tabList"
            :key="item.key"
          >
            <li
              class="cursor-pointer"
              @click="onTabClick(item.key)"
            >
              <div
                class="border-b-2 px-2 py-1"
                :class="
                  item.key === selectTab
                    ? 'border-themePrimary'
                    : 'border-neutralQuaternaryAlt'
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
        class="w-64 bg-neutralLighter relative"
        v-show="showReviseRecord || showCommentRecord"
      >
        <ReviseRecord
          v-show="showReviseRecord"
          :records="showRecords"
        />
        <CommentRecord
          v-show="showCommentRecord"
          :comments="showComments"
          @sumbit="addCommentRecord"
        />
        <img
          :src="iconClose"
          class="absolute right-1 top-2 cursor-pointer w-5 h-5"
          alt=""
          @click="onCloseClick(false, false)"
        >
      </div>
    </div>
    <div
      class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog relative w-auto pointer-events-none">
        <div
          class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
        >
          <div
            class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
          >
            <h4
              class="text-lg font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              添加锁定人
            </h4>
            <button
              type="button"
              class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body relative p-4">
            <select
              class="form-select appearance-none
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              v-model="lockUser"
            >
              <option value="user1">
                user1
              </option>
              <option value="user2">
                user2
              </option>
              <option value="user3">
                user3
              </option>
            </select>
          </div>
          <div
            class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
          >
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              data-bs-dismiss="modal"
              @click="addLockUser"
            >
              添加
            </button>
          </div>
        </div>
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
const lockUser = ref<string>('')

const lastNodeId = ref<string>('')
const currentNodeId = ref<string>('')
const currentCommentId = ref<string>('')

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
  const width = showReviseRecord.value || showCommentRecord.value ? 260 : 0
  return {
    width: `calc(${100}% - ${44}px - ${
      showList.value ? 260 : 0
    }px - ${width}px)`
  }
})

const addLockUser = () => {
  console.log('lockUser.value: ', lockUser.value)
  console.log('currentNodeId.value: ', currentNodeId.value)

  const index = records.value.findIndex(item => item.id === currentNodeId.value)
  // if (index !== -1) {
  //   records.value[index]?.row_purview.push(lockUser.value)
  // } else {
  //   records.value[index]?.row_purview = [lockUser.value]
  // }
}

const addCommentRecord = (value) => {
  comments.value.push({
    id: currentCommentId.value,
    doc_id: 'doc-110',
    doc_version: 'v1',
    row_comment: `<p style="line-height: 2.5;" data-id=${currentCommentId.value}>${value}</p>`,
    comment_name: 'user1',
    comment_time: '2022.02.15'
  })

  showComments.value = comments.value.filter(
    (item) => item.id === currentCommentId.value
  )
}

const onSaveDoc = () => {
  console.log('engine.value: ', engine.value?.getValue())
  saveLoading.value = true
  getDocSave({
    id: 'cf2e3104dd904d96bb8ac27c9892ab67',
    content: engine.value?.getValue(),
    modifier: 'hong'
  })
    .then((resp) => {
      saveLoading.value = false
    })
    .catch((error) => {
      console.log('error: ', error)
    })
}

const onDocBody = () => {
  console.log('container.value: ', String(container.value))
  saveLoading.value = true
  getDocBody({
    id: '文档ID'
  })
    .then((resp) => {
      saveLoading.value = false
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

    let iconList = ''

    const filterLock = records.value.filter((item) => item.row_purview && item.id == key)
    const title = filterLock.length ? `${filterLock[0].row_purview.join()}允许编辑` : '添加锁定人'

    if (filterLock.length) {
      console.log('filterLock: ', filterLock[0].row_purview.join())
      selectNode.setAttribute('contenteditable', false)
      selectNode.style.userSelect = 'none'
    }
    iconList += `<img class="lock" title="${title}"  data-id="${key}" src='${iconLock}' style="position: absolute;right: 10px;bottom: 7px; cursor: pointer; width: 22px; height: 22px;${
      !filterLock.length ? 'display: none' : ''
    }" data-bs-toggle="modal" data-bs-target="#staticBackdrop">`

    const filterComment = comments.value.filter((item) => item.id === key)
    iconList += `<img title="评论" class="comment" data-id="${key}" src='${iconComment}' style="position: absolute;right: 40px;bottom: 6px;cursor: pointer; width: 20px; height: 20px; ${
      !filterComment.length ? 'display: none' : ''
    }">`

    span.innerHTML = iconList
    selectNode.appendChild(span)

    selectNode.style.position = 'relative'
    const imgCommentNode = $(`img[data-id="${key}"].comment`)
    const imgLockNode = $(`img[data-id="${key}"].lock`)

    imgCommentNode.on('click', () => {
      currentCommentId.value = key
      showComments.value = filterList

      // console.log('currentCommentId.value: ', currentCommentId.value)
      showReviseRecord.value = false
      showCommentRecord.value = true
    })

    $(selectNode).on('click', () => {
      $('img.comment').hide()
      $('img.lock').hide()

      for (let i = 0; i < comments.value.length; i++) {
        const element = comments.value[i]
        $(`img.comment[data-id="${element.id}"]`).show()
      }

      for (let i = 0; i < records.value.length; i++) {
        const element = records.value[i]
        if (element.row_purview) {
          $(`img.lock[data-id="${element.id}"]`).show()
        }
      }

      imgCommentNode.show()
      imgLockNode.show()
      // console.log('段落获取焦点-----focus: ')

      if (!isRevise.value) return

      lastNodeId.value = currentNodeId.value
      currentNodeId.value = selectNode.dataset.id

      const rowInfo = records.value.find(
        (item) => item.id === lastNodeId.value && item.row_purview
      )
      // console.log('rowInfo: ', rowInfo)
      if (rowInfo) {
        lastNodeId.value = selectNode.dataset.id
      }

      // console.log('lastNodeId.value**********: ', lastNodeId.value)
      // console.log('currentNodeId.value**********: ', currentNodeId.value)

      if (lastNodeId.value === currentNodeId.value) return
      if (lastNodeId.value) {
        // console.log('111111111')
        let oriLastNodeHtml = document.createElement('div')
        oriLastNodeHtml.innerHTML = defaultContent
        // console.log('oriLastNodeHtml: ', oriLastNodeHtml)

        const lastNode = document.querySelector(
          `p[data-id=${lastNodeId.value}]`
        )
        const oriLastNode = oriLastNodeHtml.querySelector(
          `p[data-id=${lastNodeId.value}]`
        )

        const pattern1 =
          /<span><img title="评论" class="comment".*?(?:>|\/>)<\/span>/g
        const pattern2 =
          /<span><span title="修订" class="revise".*?<\/span><\/span>/g

        const lastNodeStr = lastNode?.outerHTML
          .replace(pattern1, '')
          .replace(pattern2, '')
        const oriLastNodeStr = oriLastNode?.outerHTML

        oriLastNodeHtml = null

        // console.log('lastNodeStr: ', lastNodeStr)
        // console.log('oriLastNodeStr: ', oriLastNodeStr)

        if (lastNodeStr === oriLastNodeStr) return
        if (lastNodeStr && oriLastNodeStr) {
          // 生成一条修订记录
          // console.log('生成一条修订记录: ')
          records.value.push({
            id: lastNodeId.value,
            doc_id: 'doc-110',
            doc_version: 'v1',
            row_history: lastNodeStr,
            row_original: oriLastNodeStr,
            editor_name: 'user1',
            editor_time: '2022.02.15'
          })

          showRecords.value = records.value.filter(
            (item) => item.id === lastNodeId.value
          )
          // console.log('showRecords.value: ', showRecords.value);
        }
      }
    })
  }

  for (const [key, value] of Object.entries(allLists)) {
    // console.log('allLists: ', allLists);
    if (value.row_history) {
      const selectNode = document.querySelector(
      `div.am-engine p[data-id="${key}"]`
      )

      const span = document.createElement('span')
      const list = records.value.filter((item) => item.id === key)
      // console.log('records.value*******', records.value);
      // console.log('key*******: ', key);
      selectNode.style.position = 'relative'
      selectNode.appendChild(span)
      span.innerHTML = `<span title="修订" class="revise" data-id="${key}" src='${iconRevise}' style="position: absolute;right: -24px;bottom: 7px; cursor: pointer; width: 20px; height: 20px; line-height: 20px; border: 1px solid #333;	border-radius: 50%; text-align: center; text-indent:0">${list.length}</span>`
    }
    // if (value.row_purview) {
    //   selectNode.setAttribute('contenteditable', false)
    //   selectNode.style.userSelect = 'none'
    //   iconList += `<img title="${value.row_purview.join()}允许编辑" class="lock" data-id="${key}" src='${iconLock}' style="position: absolute;right: 10px;bottom: 7px; cursor: pointer; width: 22px; height: 22px;">`
    // }
    // span.innerHTML = iconList

    $(`span[data-id="${key}"].revise`).on('click', () => {
      showRecords.value = records.value.filter((item) => item.id === key)

      showCommentRecord.value = false
      showReviseRecord.value = true
    })

    // $(`img[data-id="${key}"].comment`).on('click', () => {
    //   showReviseRecord.value = false
    //   showCommentRecord.value = true
    // })
  }
}

const records = ref([])
const showRecords = ref([])
const comments = ref([])
const showComments = ref([])
const allLists = reactive([])

const loadRecords = async () => {
  records.value = await [
    {
      id: 'p002deaf-4F18GW8L',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_purview: ['user2', 'user3'],
      row_history:
        '<p style="text-indent: 2.28571em; line-height: 2.5;" data-id="p002deaf-4F18GW8L"><span style="font-size: 16px;"><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">甲方委托乙方就<u>&nbsp;&nbsp; 综合文档管理应用系统&nbsp;&nbsp; </u>项目进行专项技术服务，并支付技术服务报酬。双方经过平等协商，在真实、充分地表达各自意愿的基础上，根据《中华人民共和国合同法》的规定，达成如下协议，并由双方共同恪守。</span></span></p>',
      row_original:
        '<p style="text-indent: 2.28571em; line-height: 2.5;" data-id="p002deaf-4F18GW8L"><span style="font-size: 16px;"><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">甲方委托乙方就<u>&nbsp;&nbsp; 综合文档管理应用系统&nbsp;&nbsp; </u>项目进行专项技术服务，并技术服务报酬。双方经过不平等协商，在表达各自意愿的基础上，根据《中华人民共和国合同法》的规定，达成如下协议，并由双方共同恪守。</span></span></p>',
      editor_name: 'user1',
      editor_time: '2022.02.15'
    },
    {
      id: 'p4ca7b43-sg1Kl5bT',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_history:
        '<p data-id="p4ca7b43-sg1Kl5bT" style="text-indent: 2.28571em;"><span style="font-size: 16px;"><strong><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">验收</span></strong><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">：是指甲方按照本合同约定的标准对乙方完成的阶段性工作成果和终极工作成果进行考核、检验的活动。</span></span></p>',
      row_original:
        '<p data-id="p4ca7b43-sg1Kl5bT" style="text-indent: 2.28571em;"><span style="font-size: 16px;"><strong><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">验收</span></strong><span style="font-family: STSong, 华文宋体, SimSun, &quot;Songti SC&quot;, NSimSun, serif;">：是指甲方暗中本合同约定的标准对乙方完成的城市古工作成果和终极工作成果进行、检验的活动。</span></span></p>',
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
      row_comment:
        '<p style="line-height: 2.5;" data-id="p4ca7b43-EVIOoLyS">这句话有问题啊啊啊啊啊啊~</p>',
      comment_name: 'user1',
      comment_time: '2022.02.15'
    },
    {
      id: 'p4ca7b43-sg1Kl5bT',
      doc_id: 'doc-110',
      doc_version: 'v1',
      row_comment:
        '<p style="line-height: 2.5;" data-id="p4ca7b43-sg1Kl5bT">这句话有问题呀呀呀呀呀~</p>',
      comment_name: 'user1',
      comment_time: '2022.02.15'
    }
  ]
}

onMounted(async () => {
  await loadComments()
  await loadRecords()
  const arrlist = [...records.value, ...comments.value]
  arrlist.map((item) => {
    if (allLists[item.id]) {
      allLists[item.id] = Object.assign(allLists[item.id], item)
    } else {
      allLists[item.id] = item
    }
  })

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
    engineInstance.on('change', (value) => {
      emit('change', {
        html: engineInstance.getHtml(),
        json: engineInstance.getJsonValue()
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
.editor-wrap ul.menu-wrap li {
  width: 36px;
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

.editor-wrap .form-check-input:checked {
  background-color: #000;
  border-color: #000;
}
</style>
<style>
.editor-content .am-engine p,
.editor-content .am-engine-view p {
  padding-right: 70px !important;
}
.am-engine tr .table-main-content p,
.am-engine-view tr .table-main-content p {
  padding-right: 0px !important;
}
</style>
