import {route} from 'quasar/wrappers'
import {createRouter, createMemoryHistory, createWebHistory, createWebHashHistory} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({left: 0, top: 0}),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('TOKEN')
    let {path} = to;

    // // 如果已经有TOKEN，则直接跳转到APP页面
    if (path === '/') {
      next();
    } else {
      // 如果已经没有TOKEN，则直接跳转到登录页面
      if (!token) {
        next({name:'loginPage',params:{tip:'当前登录状态已无效，请重新登录后尝试'}})
      } else {
        next();
      }
    }
  })

  return Router
})
