import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login')
  }, {
    path: '/terminal',
    name: 'Terminal',
    component: () => import('../views/TerminalContainer'),
    children: [
      {
        path: '/terminal/console',
        name: 'Console',
        component: () => import('../views/Terminal')
      }, {
        path: '/terminal/file',
        name: 'FileManagement',
        component: () => import('../views/FileManagement')
      }, {
        path: '/terminal/monitor',
        name: 'Monitor',
        component: () => import('../views/Monitor')
      }
    ]
  },
  {
    path: '/content',
    name: 'Content',
    component: () => import('../views/Content'),
    children: [
      {
        path: '/content',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },

      {
        path: '/content/image',
        name: 'Image',
        component: () => import('../views/Image.vue')
      },
      {
        path: '/content/container_create',
        name: 'Container',
        component: () => import('../views/CreateContainer.vue')
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
