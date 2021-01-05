import axios from "axios";

function createNewVolume(query) {
  let apiResp = axios.get(`/api/volume/new`, {params: query})
  apiResp.catch(e => {
    this.$notification['error']({
      message: `操作失败`,
      description: `操作失败,请检查 Docker 服务是否正常`
    });
  });
  return apiResp
}

function removeVolume(volumeName, forceRemoveVolume) {
  let apiResp = axios.get(
      `/api/volume/${volumeName}/delete/${forceRemoveVolume}`)
  apiResp.catch(e => {
    this.$notification['error']({
      message: `操作失败`,
      description: `操作失败,请检查 Docker 服务是否正常`
    });
  });
  return apiResp
}

function pruneVolume() {
  let apiResp = axios.get('/api/volume/prune')
  apiResp.catch(e => {
    this.$notification['error']({
      message: `操作失败`,
      description: `操作失败,请检查 Docker 服务是否正常`
    });
  });
  return apiResp
}

export default {
  createNewVolume,
  removeVolume,
  pruneVolume
}
