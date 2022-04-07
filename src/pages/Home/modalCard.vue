<template>
  <div>
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
  </div>
</template>
<script setup lang="ts" name="ModalCard">
import { useRouter } from 'vue-router'
import { Newlybuild, PreviewOpen } from '@icon-park/vue-next'

import { fetchDocCreate } from '~/api/home'

const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
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
  fetchDocCreate({
    folderId: '123',
    name: '合同文档',
    creator: 'xiaoming'
  }).then(result => {
    router.push({ path: `/docs:${result.id}` }).catch((err) => {
      console.warn(err)
    })
  }).catch(error => {
    console.log('error: ', error)
  })
}

const handleModalPreview = () => {
  router.push({ path: `/docs/${props.id}` }).catch((err) => {
    console.warn(err)
  })
}

</script>

<style scoped lang="less">

</style>
