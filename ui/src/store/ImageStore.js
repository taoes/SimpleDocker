import axios from "axios";
import {formatDate, parseId} from "../utils/index";

const imageStore = {
  state: {
    imageList: [],
    imageInfo: {
      Id: ':',
      Parent: ':',
      Author: '',
      Size: 0,
      Architecture: '',
      Os: '',
      GraphDriver: {Name: ''},
      Config: {},
      DockerVersion: ''

    }
  },
  mutations: {
    setImageList: function (state, payload) {
      state.imageList = payload
    }, setImageInfo: function (state, payload) {
      state.imageInfo = payload
    }
  },
  actions: {
    updateImageList(context) {
      axios.get('/api/image').then(res => {
        let {data} = res;
        let imageList = []
        for (let i = 0; i < data.length; i++) {
          let image = data[i];
          let tags = image.RepoTags;
          for (let index in tags) {
            imageList.push({
              key: tags[index],
              rep: tags[index],
              size: (image.Size / 1000000).toFixed(2) + 'M',
              imageLongId: parseId(image.Id),
              imageId: image.Id.split(":")[1].substring(0, 12),
              created: formatDate(image.Created)
            })
          }
          context.commit('setImageList', imageList)
        }
      });
    }, getImageInfo(context, {imageId}) {
      axios.get(`/api/image/${imageId}`).then(res => {
        context.commit('setImageInfo', res.data);
      });
    }, removeImage(context, {imageId}) {

    }
  },

}

export default imageStore;
