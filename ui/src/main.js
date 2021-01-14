import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import _ from 'lodash'
import 'ant-design-vue/dist/antd.css';

import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Config from './api/Config'
import {formatUTCTime} from './utils/index'

axios.defaults.baseURL = Config.HOST
axios.interceptors.request.use(config => {
  if (config.url === '/api/system/login') {
    return config
  }
  if (!localStorage.token) {
    router.push("/")
  } else {
    let tokenStr = localStorage.token;
    let token = jwtDecode(tokenStr)
    if (new Date(token.exp).getTime() < new Date().getTime()) {
      localStorage.setItem("token", "")
      router.push("/")
    } else {
      config.headers.Authorization = localStorage.token;
      return config
    }
  }
});

Vue.prototype.$lodash = _
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Antd);

// 自定义指令
Vue.directive('focus', {
  inserted: function (el) {
    el.querySelector("input").focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
