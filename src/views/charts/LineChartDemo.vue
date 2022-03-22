
<template>
  <div class="chart-container">
    <LineChart
      height="100%"
      width="100%"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LineChart from '@/components/charts/LineCart.vue'
export default defineComponent({
  components: {
    LineChart
  }
})
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
