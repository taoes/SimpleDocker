import axios from "axios";
import _ from 'lodash'

const dockerInfoStore = {
  state: {
    info: {},
    dockerPlugins: {}
  }, mutations: {
    setDockerPlugins: function (state, payload) {
      state.dockerPlugins = payload
    },
    setInfo: function (state, payload) {
      state.info = payload
    }
  }, actions: {
    updateDockerInfo(context) {
      axios.get('/api/docker/info').then(res => {
        let {Data, Code} = res.data
        if (Code === 'OK') {
          let defaultValue = {Volume: [], Network: [], Log: []};
          let dockerPlugins = _.get(Data, 'Plugins', defaultValue)
          console.log(dockerPlugins)
          context.commit('setDockerPlugins', dockerPlugins)
          context.commit('setInfo', Data)
        } else {
          console.error("获取Docker信息失败")
        }
      });
    }
  }
}

export default dockerInfoStore;
