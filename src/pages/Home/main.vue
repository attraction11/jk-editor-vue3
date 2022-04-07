<template>
  <div class="home-wrap">
    <div class="home-body">
      <div class="home-layout">
        <div class="home-layout-sider">
          <div class="brand-wrap">
            <a
              href="/"
              class="logo"
            >
              <img
                :src="logo"
                alt=""
              >
              <span class="product">哲一云文档</span>
            </a>
          </div>
          <ul class="home-layout-menu">
            <li><Home />主页</li>
            <li><DocDetil />我的空间</li>
            <li><Delete />回收站</li>
          </ul>
        </div>
        <div class="home-layout-content">
          <div class="content-header">
            <ul class="operate">
              <li>
                <button
                  size="small"
                  type="primary"
                  @click="visible = true"
                >
                  新建
                </button>
              </li>
              <li>
                <img
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                >
              </li>
            </ul>
          </div>
          <div class="content-body">
            <HomeContent :source="dataSource" />
          </div>
        </div>
      </div>
    </div>
    <Dialog>
      <div class="modal-card-wrap">
        <ModalCard
          v-for="item in modalCardList"
          :id="item.id"
          :key="item.id"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
import { ref, onMounted } from 'vue'
import logo from '~/assets/logo.svg'
import Dialog from '~/components/Dialog'
import HomeContent from './homeContent.vue'
import ModalCard from './modalCard.vue'
import { fetchHomeDocs } from '~/api/home'
import { Home, DocDetil, Delete } from '@icon-park/vue-next'

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
<style lang="less">
.home-wrap {
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background: #fff;
  position: relative;
  .home-body {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #fff;
      .brand-wrap {
        padding-top: 16px;
        padding-bottom: 40px;
        height: 88px;
        a.logo {
          display: flex;
          align-items: center;
          line-height: 30px;
          img {
            width: 30px;
            height: 30px;
            margin: 0 12px 0 20px;
          }
          span.product {
            font-size: 14px;
            color: #1f2329;
            font-weight: 700;
          }
        }
      }
      ul.operate {
        display: flex;
        width: 350px;
        justify-content: flex-end;
        margin: 0;
        span.ant-avatar {
          margin-left: 20px;
          margin-bottom: 8px;
        }
      }
  }
}
.modal-card-wrap {

}
</style>
