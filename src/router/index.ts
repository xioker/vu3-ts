import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import staticRouter from './staticRouter'
import dynamicRouter from './dynamicRouter'

const routes:Array<RouteRecordRaw> = [
  ...staticRouter,
  ...dynamicRouter
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
export default router