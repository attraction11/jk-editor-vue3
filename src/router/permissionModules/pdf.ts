
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const PdfRouter: Array<RouteRecordRaw> = [
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "pdf" */ '@/views/pdf/Index.vue'),
        name: 'PDF',
        meta: {
          title: 'pdf',
          icon: '#iconpdf'
        }
      }
    ]
  },
  {
    path: '/pdf-download-example',
    component: () => import(/* webpackChunkName: "pdf" */ '@/views/pdf/Download.vue'),
    meta: { hidden: true }
  }
]

export default PdfRouter
