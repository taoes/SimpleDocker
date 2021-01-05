import axios from "axios";
import {formatUTCTime, parseId} from "../utils/index";

const volumeStore = {
  state: {
    list: [],
    info: {}
  },
  mutations: {
    setList: function (state, payload) {
      state.list = payload
    }, setInfo: function (state, payload) {
      state.info = payload
    }
  },
  actions: {
    updateVolumeList(context) {
      axios.get('/api/volume').then(res => {
        let {Data} = res.data
        if (!Data) {
          context.commit('setList', [])
          return
        }
        let {Volumes} = Data;
        let volumeList = []
        for (let i = 0; i < Volumes.length; i++) {
          let volume = Volumes[i]
          volumeList.push({
            key: volume.Name,
            LongName: volume.Name,
            Name: parseId(volume.Name),
            Driver: volume.Driver,
            Scope: volume.Scope,
            Created: formatUTCTime(volume.CreatedAt)
          })
        }
        context.commit('setList', volumeList)
      });
    }, updateVolumeInfo(context, imageLongName) {
      axios.get(`/api/volume/${imageLongName}/info`).then(res => {
        let {Code, Data} = res.data
        if (Code !== 'OK') {
          context.commit('setInfo', {})
        } else {
          context.commit('setInfo', Data)
        }
      });
    }
  },

}

export default volumeStore;
