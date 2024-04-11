import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCurrentUserStore } from '@/stores/currentUser'
const whiteList = ['/xxx']
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = useCurrentUserStore()
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (to.name !== 'login' && !currentUser.isLogin()) {
      next({ name: 'login' })
    } else if (to.name == 'login' && currentUser.isLogin()) {
      next({ name: 'home' })
    } else {
      next()
    }
  }

})
export default router
