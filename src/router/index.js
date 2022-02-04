import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../views/layout/index.vue'),
    redirect: 'home',

    children: [{
      path: 'home',
      name: 'home',
      meta: {
        index: 0
      },
      component: () => import('../views/home/index.vue')
    },
    {
      path: 'qa',
      name: 'qa',
      meta: {
        index: 1
      },
      component: () => import('../views/qa/index.vue')
    },
    {
      path: 'video',
      name: 'video',
      meta: {
        index: 2
      },
      component: () => import('../views/video/index.vue')
    },
    {
      path: 'my',
      name: 'my',
      meta: {
        index: 3
      },
      component: () => import('../views/my/index.vue')
    },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('../views/article/index.vue'),
    props: true
  }

]

const router = new VueRouter({
  routes
})

export default router
