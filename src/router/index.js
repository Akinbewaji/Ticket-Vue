import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'
import Tickets from '../views/Tickets.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('ticketapp_session')
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/auth')
  } else {
    next()
  }
})

export default router
