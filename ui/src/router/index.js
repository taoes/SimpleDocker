import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/Image.vue')
  },
  {
    path: '/container',
    name: 'Image',
    component: () => import(/* webpackChunkName: "about" */ '../views/Container.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
