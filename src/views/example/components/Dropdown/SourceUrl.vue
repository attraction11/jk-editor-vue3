
<template>
  <el-dropdown
    :show-timeout="100"
    trigger="click"
  >
    <el-button plain>
      Link
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu
        class="no-padding"
        style="width:400px"
      >
        <el-form-item
          label-width="0px"
          style="margin-bottom: 0px"
          prop="sourceURL"
        >
          <el-input
            v-model="myinput"
            placeholder="请输入内容"
            @change="changeVal"
          />
        </el-form-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['inputUrl'],
  setup(props, ctx) {
    const dataMap = reactive({
      myinput: props.value.length ? props.value : '',
      changeVal: (val: any) => {
        ctx.emit('inputUrl', val)
      }
    })

    return { ...toRefs(dataMap) }
  }

})
</script>
