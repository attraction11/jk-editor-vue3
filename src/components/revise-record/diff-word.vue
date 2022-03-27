<template>
  <div
    :class="props.id"
    :data-id="props.id"
    @click="scrollTop"
  />
</template>

<script setup lang="ts" name="diff-html">
import { onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  history: {
    type: String,
    required: true
  }
})

const selectNode = document.querySelector(`.am-engine p[data-id=${props.id}]`)
selectNode.style.textDecoration = 'wavy underline orange'

const scrollTop = () => {
  selectNode.scrollIntoView()
}

onMounted(() => {
  // eslint-disable-next-line no-undef
  const diff = Diff.diffChars(props.origin, props.history)
  const fragment = document.createDocumentFragment()

  diff.forEach((part) => {
    const pattern = /<("[^"]*"|'[^']*'|[^'">])*>/g
    part.value = part.value.replace(pattern, '')

    const span = document.createElement('span')
    if (part.added) {
      span.style.color = 'green'
    }
    if (part.removed) {
      span.style.color = '#999'
      span.style.textDecoration = 'line-through'
    }
    span.appendChild(document.createTextNode(part.value))
    fragment.appendChild(span)
  })

  const diffDom = document.querySelector(`.${props.id}`)
  diffDom.innerHTML = ''
  diffDom.appendChild(fragment)
})
</script>

<style scoped lang="less"></style>
