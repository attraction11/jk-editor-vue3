import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '~/layouts/index.vue'
import nprogress from 'nprogress' // @types/nprogress
import 'nprogress/nprogress.css'

const HomeMain = () => import('~/pages/Home/main.vue')
const EditorMain = () => import('~/pages/Editor/main.vue')

const routes: RouteRecordRaw[] = [
  // 路由规则
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: 'home', // 默认子路由
        name: 'home',
        component: HomeMain,
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/docs',
    name: 'docs',
    component: EditorMain
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes // 路由规则
})

router.beforeEach((to, from) => {
  nprogress.start() // 开始加载进度条
  // if (to.meta.requiresAuth && !store.state.user) {
  //   // 此路由需要授权，请检查是否已登录
  //   // 如果没有，则重定向到登录页面
  //   return {
  //     path: '/admin/login',
  //     // 保存我们所在的位置，以便以后再来
  //     query: { redirect: to.fullPath }
  //   }
  // }
})

router.afterEach(() => {
  nprogress.done() // 加载进度条
})

export default router
