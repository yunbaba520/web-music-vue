import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home/index.vue')
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import(/* webpackChunkName: "album" */ '../views/Album/index.vue')
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import(/* webpackChunkName: "singer" */ '../views/Singer/index.vue')
  },
  {
    path: '/songsheet',
    name: 'Songsheet',
    component: () => import(/* webpackChunkName: "songsheet" */ '../views/SongSheet/index.vue')
  },
  {
    path: '/toplist',
    name: 'Toplist',
    component: () => import(/* webpackChunkName: "toplist" */ '../views/Toplist/index.vue')
  },
  {
    path: '/songsheetDetail',
    name: 'songsheetDetail',
    component: () => import(/* webpackChunkName: "songsheetDetail" */ '../views/SongSheetDetail/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
