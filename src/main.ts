// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'

import { useTable } from './plugin/vxe-table'

const app = createApp(App)
app.use(router)
app.use(useTable)

// 自动注册全局组件
// const modules = import.meta.globEager('./components/global/**/index.ts')
// for (const path in modules) {
//   app.use(modules[path].default)
// }

app.mount('#app')
