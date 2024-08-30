import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../views/layout/index.vue'
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
        component: () => import("../views/home/index.vue"),
      },
      {
        path: '/issueDigipo',
        name: 'issueDigipo',
        component: () => import("../views/issueDigipo/index.vue"),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
