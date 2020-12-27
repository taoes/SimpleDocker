import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import imageStore from './ImageStore'
import ContainerStore from './ContainerStore'
import menuStore from './MenuStore'

export default new Vuex.Store({
  modules: {
    image: imageStore,
    container: ContainerStore,
    menu: menuStore
  }
});
