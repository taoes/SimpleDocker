import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import imageStore from './ImageStore'

export default new Vuex.Store({
  modules: {
    image: imageStore
  }
});
