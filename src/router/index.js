import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../views/layout/index.vue'
const routes = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import("../views/home/index.vue"),
      },
      {
        path: '/supplierHome',
        name: 'supplierHome',
        component: () => import("../views/supplierHome/index.vue"),
      },
      {
        path: '/issueDigipo',
        name: 'issueDigipo',
        component: () => import("../views/issueDigipo/index.vue"),
      },
      {
        path:'/supplierReview',
        name:'supplierReview',
        component:()=>import("@/views/supplierHome/review/index.vue")
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
