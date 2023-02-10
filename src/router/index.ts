import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import dataForm from '@/components/data-form.vue'
import detail from '@/components/view-detail.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'form',
    component:  dataForm
  },
  {
    path: '/:plate',
    name: 'data',
    component:  detail
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
