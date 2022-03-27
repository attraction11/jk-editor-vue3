<template>
  <div class="home-wrap">
    <div class="home-body">
      <a-layout class="h-full">
        <a-layout-sider class="bg-slate-100">
          <div class="brand-wrap">
            <a href="/" class="logo">
              <img :src="logo" alt="" />
              <span class="product">哲一云文档</span>
            </a>
          </div>
          <HomeMenu></HomeMenu>
        </a-layout-sider>
        <a-layout>
          <a-layout-header>
            <a-input-search
              v-model:value="searchValue"
              placeholder="搜索一下"
              style="width: 400px"
              class="h-1/2"
              @search="onSearch"
            />
            <ul class="operate">
              <li>
                <a-avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </li>
            </ul>
          </a-layout-header>
          <a-layout-content class="overflow-auto">
            <HomeContent></HomeContent>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
import { onMounted, ref } from 'vue'
import { SelectTypes } from 'ant-design-vue/es/select'
import logo from '~/assets/logo.svg'
import HomeMenu from './homeMenu.vue'
import HomeContent from './homeContent.vue'

const searchValue = ref<string>('')

const onSearch = (value: string) => {
  console.log('use value', value)
  console.log('or use this.value', searchValue.value)
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
</style>
