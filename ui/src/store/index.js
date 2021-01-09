import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import imageStore from './ImageStore'
import ContainerStore from './ContainerStore'
import menuStore from './MenuStore'
import networkStore from './NetworkStore'
import volumeStore from './VolumeStore'
import dockerInfoStore from './DockerInfoStore'

export default new Vuex.Store({
  modules: {
    image: imageStore,
    container: ContainerStore,
    menu: menuStore,
    network: networkStore,
    volume: volumeStore,
    dockerInfo: dockerInfoStore
  }
});
