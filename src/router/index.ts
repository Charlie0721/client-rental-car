import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import dataForm from '@/components/data-form.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'form',
    component:  dataForm
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
