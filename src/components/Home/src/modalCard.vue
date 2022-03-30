<template>
  <a-card
    hoverable
  >
    <a-card-meta
      :title="title"
      :description="description"
    />
    <template
      class="ant-card-actions"
      #actions
    >
      <div
        class="card-item"
        @click="handleModalUse"
      >
        <Newlybuild
          key="new"
        /><span>使用</span>
      </div>
      <div
        class="card-item"
        @click="handleModalPreview"
      >
        <PreviewOpen key="eye" />
        <span>预览</span>
      </div>
    </template>
  </a-card>
</template>
<script setup lang="ts" name="ModalCard">
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { Newlybuild, PreviewOpen } from '@icon-park/vue-next'
// import { PlusCircleOutlined, EyeOutlined } from '@ant-design/icons-vue'

import { getDocCreate } from '~/api/home'

const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const handleModalUse = () => {
  console.log('event: ', 'goto docs...')
  // getDocCreate().then(resp => {
  //   if (resp.data.code !== '0') {
  //     message.error(resp.data.msg || '创建文档失败！')
  //     return
  //   }
  //   router.push({ path: '/docs' }).catch((err) => {
  //     console.warn(err)
  //   })
  // }).catch(error => {
  //   console.log('error: ', error)
  // })
  router.push({ path: '/docs' }).catch((err) => {
    console.warn(err)
  })
}

const handleModalPreview = () => {}

</script>

<style scoped lang="less">
.ant-card {
  height: 260px;
  width: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #efefef;
  border-radius: 6px;
  .ant-card-actions .card-item{
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      padding-left: 10px;
    }
  }
}
</style>
