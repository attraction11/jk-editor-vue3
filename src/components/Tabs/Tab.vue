<template>
  <section
    v-show="isActive"
    :aria-hidden="! isActive"
    class="tabs-component-panel"
    :id="computedId"
    role="tabpanel"
  >
    <slot />
  </section>
</template>

<script setup lang="ts" name="Tab">
import { ref, computed } from 'vue'

const isActive = ref(false)
const isVisible = ref(true)

const props = defineProps({
  id: {
    type: [Number, null],
    default: null
  },
  name: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const header = computed(() => {
  return props.prefix + props.name + props.suffix
})

const computedId = computed(() => {
  return props.id ? props.id : props.name.toLowerCase().replace(/ /g, '-')
})

const hash = computed(() => {
  if (props.isDisabled) {
    return '#'
  }

  return '#' + computedId.value
})

</script>
