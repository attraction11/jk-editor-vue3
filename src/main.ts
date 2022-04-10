import App from './App.vue'
import { createApp } from 'vue'
import router from './router/index'

// import { useTable } from './plugin/vxe-table'
// import SvgIcon from './components/SvgIcon.vue'
// import DropdownMenu from './components/DropdownMenu.vue'
// import VueCustomTooltip from './components/Tooltip/index'
import './index.css'

const app = createApp(App)
app.use(router)
// app.use(useTable)
// app.component('SvgIcon', SvgIcon)
// app.component('DropdownMenu', DropdownMenu)

// app.use(VueCustomTooltip)

// app.directive(
//   'click-outside', {
//     beforeMount (el, binding, vnode) {
//       el.clickOutsideEvent = function (event) {
//         if (!(el === event.target || el.contains(event.target))) {
//           binding.value(event, el)
//         }
//       }
//       document.body.addEventListener('click', el.clickOutsideEvent)
//     },
//     unmounted (el) {
//       document.body.removeEventListener('click', el.clickOutsideEvent)
//     }
//   }
// )

// 自动注册全局组件
// const modules = import.meta.globEager('./components/global/**/index.ts')
// for (const path in modules) {
//   app.use(modules[path].default)
// }

app.mount('#app')
