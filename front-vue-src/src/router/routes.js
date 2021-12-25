const routes = [

  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {name: 'loginPage', path: '/', component: () => import('pages/LoginPage.vue')}
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/app/index', component: () => import('pages/Index.vue')},
      {path: '/app/images', component: () => import('pages/ImagePage.vue')},
      {path: '/app/container', component: () => import('pages/ContainerPage.vue')},
      {path: '/app/volume', component: () => import('pages/VolumePage.vue')},
      {path: '/app/network', component: () => import('pages/NetworkPage.vue')},
      {path: '/app/config', component: () => import('pages/SystemConfigPage.vue')},
      {path: '/app/security', component: () => import('pages/SecurityConfigPage.vue')},
      {name: 'createNewContainer', path: '/app/container/new', component: () => import('pages/container/New.vue')},
    ]
  }, {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
