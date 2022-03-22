
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const ProfileRouter: Array<RouteRecordRaw> = [
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "clipboard" */ '@/views/clipboard/Index.vue'),
        name: 'Clipboard',
        meta: {
          title: 'clipboard',
          icon: '#iconcopy'
        }
      }
    ]
  }
]

export default ProfileRouter
