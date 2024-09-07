
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      // {
      //   path: 'catalog',
      //   name: 'Catalog',
      //   component: () => import(/* webpackChunkName: 'page-catalog' */ '@/views/catalog/Catalog.vue'),
      // },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
