import axios from "axios";
import {formatDate} from "../utils/index";

export default {
  state: {
    imageList: []
  },
  mutations: {
    setImageList: function (state, payload) {
      state.imageList = payload
    }
  },
  actions: {
    updateContainerList(context) {
      axios.get('/api/container').then(res => {
        let {data} = res;
        let imageList = []
        for (let i = 0; i < data.length; i++) {
          let image = data[i];
          let tags = image.RepoTags;
          for (let tagIndex in tags) {
            imageList.push({
              rep: tags[tagIndex],
              size: (image.Size / 1000000).toFixed(2) + 'Mb',
              imageLongId: image.Id.split(":")[1],
              imageId: image.Id.split(":")[1].substring(0, 12),
              created: formatDate(image.Created)
            })
          }
          context.commit('setImageList', imageList)
        }
      });
    },
  },

};


