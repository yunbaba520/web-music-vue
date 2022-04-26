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
    component: () => import(/* webpackChunkName: "album" */ '../views/Album/index.vue'),
    children:[
      {
        path:'',
        redirect:'/album/albumList'
      },
      {
        path:'albumList',
        name:'AlbumList',
        component:()=>import('../views/AlbumList')
      },
      {
        path:'albumDetail',
        name:'AlbumDetail',
        component:()=>import('../views/AlbumDetail')
      },
    ]
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import(/* webpackChunkName: "singer" */ '../views/Singer/index.vue'),
    children:[
      {
        path:'',
        redirect:'/singer/singerList'
      },
      {
        path:'singerList',
        name:'SingerList',
        component:()=>import('../views/SingerList/index.vue')
      },
      {
        path:'singerDetail',
        name:'SingerDetail',
        component:()=>import('../views/SingerDetail/index.vue'),
        children:[
          {
              path:'',
              redirect:'/singer/singerDetail/hotList'
          },
          {
            path:'hotList',
            name:'HotList',
            component:()=>import('../views/SingerDetail/c-pages/hotList.vue')
          },
          {
            path:'allList',
            name:'AllList',
            component:()=>import('../views/SingerDetail/c-pages/allList.vue')
          },
        ]
      },
    ]
  },
  {
    path: '/songsheet',
    name: 'Songsheet',
    component: () => import(/* webpackChunkName: "songsheet" */ '../views/SongSheet/index.vue'),
    children:[
      {
        path:'',
        redirect:'/songsheet/songsheetList'
      },
      {
        path:'songsheetList',
        name:'SongsheetList',
        component:()=>import('../views/SongSheetList')
      },
      {
        path:'songsheetDetail',
        name:'SongsheetDetail',
        component:()=>import('../views/SongSheetDetail')
      },
    ]
  },
  {
    path: '/toplist',
    name: 'Toplist',
    component: () => import(/* webpackChunkName: "toplist" */ '../views/Toplist/index.vue')
  },
  {
    path: '/myMusic',
    name: 'MyMusic',
    component: () => import(/* webpackChunkName: "MyMusic" */ '../views/MyMusic/index.vue'),
    children:[
      {
        path:'',
        redirect:'/myMusic/heard'
      },
      {
        path:'heard',
        name:'Heard',
        component:()=>import('../views/MyMusic/c-pages/heard.vue')
      },
      {
        path:'created',
        name:'Created',
        component:()=>import('../views/MyMusic/c-pages/created.vue')
      },
      {
        path:'collect',
        name:'Collect',
        component:()=>import('../views/MyMusic/c-pages/collect.vue')
      },
      {
        path:'follows',
        name:'Follows',
        component:()=>import('../views/MyMusic/c-pages/follows.vue')
      },
      {
        path:'followeds',
        name:'Followeds',
        component:()=>import('../views/MyMusic/c-pages/followeds.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
