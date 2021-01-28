import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/zrb',
      name: 'zrb',
      component: () => import('@/views/zrb/index.vue')
    }
  ]
})
