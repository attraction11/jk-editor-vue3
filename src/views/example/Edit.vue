
<template>
  <ArticleDetail :isEdit="true" />
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import ArticleDetail from './components/ArticleDetail.vue'

export default defineComponent({
  components: {
    ArticleDetail
  }
})
</script>
