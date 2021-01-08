import axios from "axios";
import {formatDate, parseId} from "../utils/index";

const containerStatusMap = {
  "created": "已创建",
  "running": "运行中",
  "paused": "暂停中",
  "restarting": "重启中",
  "exited": "已停止",
  "destroyed": "已销毁",
}

export default {
  state: {
    containerList: [],
    containerInfo: {
      HostConfig: {},
      State: {
        Status: ''
      }
    }
  },
  mutations: {
    setContainerList: function (state, payload) {
      state.containerList = payload
    }, setContainerInfo: function (state, payload) {
      state.containerInfo = payload
    }
  },
  actions: {
    updateContainerInfo(context, containerId) {
      if (!containerId) {
        return
      }
      axios.get(`/api/container/${containerId}/info`).then(res => {
        let {Data} = res.data
        context.commit('setContainerInfo', Data)
      });
    },
    updateContainerList(context) {
      axios.get('/api/container').then(res => {
        let {data} = res;
        let containerList = []
        for (let i = 0; i < data.length; i++) {
          let container = data[i];
          let names = container.Names;
          for (let index in names) {
            let imageName = container.Image;
            if (imageName.startsWith("sha256")) {
              imageName = imageName.substring(7, 19);
            }
            containerList.push({
              key: parseId(container.Id),
              containerLongId: container.Id,
              containerId: container.Id.substring(0, 12),
              containerName: names[index].substring(1),
              imageName: imageName,
              created: formatDate(container.Created),
              state: containerStatusMap[container.State]
            })
          }
          context.commit('setContainerList', containerList)
        }
      });
    },
  },

};


