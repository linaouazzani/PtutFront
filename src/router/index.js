import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import PatientDashboardView from '../views/PatientDashboardView.vue'
import ProDashboardView from '../views/ProDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/patient-dashboard',
      name: 'patient-dashboard',
      component: PatientDashboardView
    },
    {
      path: '/pro-dashboard',
      name: 'pro-dashboard',
      component: ProDashboardView
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router