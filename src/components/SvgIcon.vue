<template lang="">
  <div v-bind="$attrs">
    <svg
      class="svg-icon"
      aria-hidden="true"
      :style="{color}"
    >
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>
<script setup name="SvgIcon">
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  }
})

const iconName = computed(() => {
  return `#icon-${props.name}`
})

</script>
<style lang="css">
  .svg-icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;
  }
</style>
