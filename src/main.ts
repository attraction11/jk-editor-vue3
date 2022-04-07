import App from './App.vue'
import { createApp } from 'vue'
import router from './router/index'

import { useTable } from './plugin/vxe-table'
import './index.css'

const app = createApp(App)
app.use(router)
app.use(useTable)

// 自动注册全局组件
// const modules = import.meta.globEager('./components/global/**/index.ts')
// for (const path in modules) {
//   app.use(modules[path].default)
// }

app.mount('#app')
