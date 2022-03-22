
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const GuideRouter: Array<RouteRecordRaw> = [
  {
    path: '/guide',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/Index.vue'),
        name: 'Guide',
        meta: {
          title: 'guide',
          icon: '#iconguide'
        }
      }
    ]
  }
]

export default GuideRouter
