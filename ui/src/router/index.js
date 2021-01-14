import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Content from "../views/Content";
import Terminal from "@/views/Terminal";
import TerminalContainer from "@/views/TerminalContainer";
import FileManagement from "@/views/FileManagement";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/terminal',
    name: 'Terminal',
    component: TerminalContainer,
    children: [
      {
        path: '/terminal/console',
        name: 'Console',
        component: Terminal
      }, {
        path: '/terminal/file',
        name: 'FileManagement',
        component: FileManagement
      }
    ]
  },
  {
    path: '/content',
    name: 'Content',
    component: Content,
    children: [
      {
        path: '/content',
        name: 'Home',
        component: Home
      },

      {
        path: '/content/image',
        name: 'Image',
        component: () => import('../views/Image.vue')
      },
      {
        path: '/content/container',
        name: 'Container',
        component: () => import('../views/Container.vue')
      },
      {
        path: '/content/volume',
        name: 'Volume',
        component: () => import('../views/Volume.vue')
      },
      {
        path: '/content/network',
        name: 'Network',
        component: () => import('../views/Netowork.vue')
      },
      {
        path: '/content/secret',
        name: 'Secret',
        component: () => import('../views/Secret.vue')
      },
      {
        path: '/content/setting',
        name: 'Setting',
        component: () => import('../views/Setting.vue')
      },
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
