<template>
  <div class="home-wrap">
    <div class="home-body">
      <a-layout class="h-full">
        <a-layout-sider class="bg-slate-100">
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
          <HomeMenu />
        </a-layout-sider>
        <a-layout>
          <a-layout-header>
            <a-input-search
              v-model:value="docSearchValue"
              placeholder="搜索一下"
              style="width: 400px"
              class="h-1/2"
              @search="onDocSearch"
            />
            <ul class="operate">
              <li>
                <a-button
                  size="small"
                  type="primary"
                  @click="showModal"
                >
                  新建
                </a-button>
              </li>
              <li>
                <a-avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </li>
            </ul>
          </a-layout-header>
          <a-layout-content class="overflow-auto">
            <HomeContent />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
    <a-modal
      v-model:visible="visible"
      width="600px"
      :footer="null"
      title="模板库"
      @ok="handleOk"
    >
      <div
        class="modal-card-wrap"
      >
        <ModalCard
          v-for="item in modalCardList"
          :key="item.id"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
import { ref } from 'vue'
import logo from '~/assets/logo.svg'
import HomeMenu from './homeMenu.vue'
import HomeContent from './homeContent.vue'
import ModalCard from './modalCard.vue'

const docSearchValue = ref<string>('')
const modalSearchValue = ref<string>('')
const visible = ref<boolean>(false)
let modalCardList = ref([])

modalCardList = [{
  id: 1,
  title: '会议记录 (简洁版) ',
  description: `会议主题：简要描述会议主题和目标。
参会人：输入“@+人名”插入参会人员。
会前必读：输入@ 插入相关背景资料。`
}, {
  id: 2,
  title: '项目里程碑流程图',
  description: '通过流程图，可视化展示项目里程碑关键信息'
}]

const onDocSearch = (value: string) => {
  console.log('or use this.value', docSearchValue.value)
}

const onModalSearch = (value: string) => {
  console.log('or use this.value', modalSearchValue.value)
}

const showModal = () => {
  visible.value = true
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  visible.value = false
}

</script>
<style scoped lang="less">
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
    .ant-layout-sider {
      background-color: #f5f6f7;
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
      .ant-menu {
        background-color: #f5f6f7;
      }
    }
    .ant-layout-header {
      height: 64px;
      padding: 0px 24px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .ant-input-search {
        padding: 0 10px;
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
    .ant-layout-content {
      background-color: #fff;
      padding: 10px 24px;
    }
  }
}
  .modal-card-wrap{
    display: flex;
    justify-content: space-around;
  }
</style>
