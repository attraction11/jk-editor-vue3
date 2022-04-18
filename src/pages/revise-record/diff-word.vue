<template>
  <div
    class="diff-word"
    ref="diffNode"
    @click="scrollTop(props.id)"
  />
</template>

<script setup lang="ts" name="diff-html">
import { onMounted, ref } from 'vue'

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

// const selectNode = document.querySelector(`.am-engine p[data-id=${props.id}]`)
// if (selectNode) {
//   selectNode.style.textDecoration = 'wavy underline orange'
// }

const diffNode = ref(null)

const scrollTop = (id) => {
  // selectNode.scrollIntoView()
  console.log('id: ', id);
  const top = document.querySelector(`p[data-id="${id}"]`).offsetTop
  console.log('top: ', top);
  document.querySelector('.editor-content').scrollTop = top
}

onMounted(() => {
  // eslint-disable-next-line no-undef
  const diff = Diff.diffChars(props.origin, props.history)
  const fragment = document.createDocumentFragment()

  diff.forEach((part) => {
    const pattern = /<("[^"]*"|'[^']*'|[^'">])*>/g
    part.value = part.value.replace(pattern, '')
    part.value = part.value.replace(/&nbsp;/g, '')

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

  // const diffDom = document.querySelector(`div[data-id="${props.id}"].diff-word`)
  // console.log('diffNode.value: ', diffNode.value);
  diffNode.value.innerHTML = ''
  diffNode.value.appendChild(fragment)
})
</script>

<style scoped lang="less"></style>
