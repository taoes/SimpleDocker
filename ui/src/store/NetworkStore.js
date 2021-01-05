import axios from "axios";
import {formatUTCTime, parseId} from "../utils/index";

const imageStore = {
  state: {
    list: [],
    info: {}
  }, mutations: {
    setList: function (state, payload) {
      state.list = payload
    }, setInfo: function (state, payload) {
      state.info = payload
    }
  }, actions: {
    updateNetworkList(context) {
      axios.get('/api/network').then(res => {
        let {Data} = res.data
        let netWorkList = []
        for (let i = 0; i < Data.length; i++) {
          let network = Data[i]
          netWorkList.push({
            Id: parseId(network.Id),
            LongId: network.Id,
            Name: network.Name,
            Driver: network.Driver,
            Scope: network.Scope,
            Created: formatUTCTime(network.Created)
          })
        }
        context.commit('setList', netWorkList)
      });
    }, updateNetworkInfo(context, networkId) {
      if (!networkId) {
        return
      }
      axios.get(`/api/network/${networkId}/info`).then(res => {
        let {Data} = res.data
        context.commit('setInfo', Data)
      });
    }
  }
}

export default imageStore;
