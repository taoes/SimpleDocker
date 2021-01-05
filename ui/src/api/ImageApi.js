import axios from "axios";

function runNewContainer(containerConfig) {
  let apiResp = axios.get(`/api/container/run`, {params: containerConfig})
  apiResp.catch(e => {
    this.$notification['warning']({
      message: `操作失败`,
      description: `操作失败,请检查 Docker 服务是否正常`
    });
  });
  return apiResp

}

export default {
  runNewContainer: runNewContainer
}
