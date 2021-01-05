import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/image',
    name: 'Image',
    component: () => import('../views/Image.vue')
  },
  {
    path: '/container',
    name: 'Container',
    component: () => import('../views/Container.vue')
  },
  {
    path: '/volume',
    name: 'Volume',
    component: () => import('../views/Volume.vue')
  },
  {
    path: '/network',
    name: 'Network',
    component: () => import('../views/Netowork.vue')
  },
  {
    path: '/secret',
    name: 'Secret',
    component: () => import('../views/Secret.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
