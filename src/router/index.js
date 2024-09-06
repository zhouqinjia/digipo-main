import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../views/layout/index.vue'
import { ElMessage } from 'element-plus'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/login/index.vue"),
  },
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import("../views/core/index.vue"),
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
      },
      {
        path: '/applyDigipoTransfer',
        name: 'applyDigipoTransfer',
        component: () => import("../views/applyDigipoTransfer/index.vue"),
      },
      {
        path: '/transferDetail',
        name: 'transferDetail',
        component: () => import("../views/applyDigipoTransfer/transferDetail.vue"),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('isLogin')
  if (isLogin === 'yes') {
    next()
  } else {
    if (to.path !== '/login') {
      ElMessage({
        message: `You haven't logged in yet, please log in first.`,
        type: 'error'
      })
      next('/login')
    } else {
      next()
    }
  }
})
export default router
