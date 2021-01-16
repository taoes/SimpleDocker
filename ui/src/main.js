import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import _ from 'lodash'
import 'ant-design-vue/dist/antd.css';

import axios from './api/axios'

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
