import axios from "axios";
import message from "ant-design-vue/lib/message";
import notification from "ant-design-vue/lib/notification";

function newNetwork(params) {
  let promise = axios.get(`/api/network/new`, {params: params});
  handleError(promise)
  return promise
}

function pruneNetwork() {
  let apiResp = axios.delete(`/api/network/prune`,)
  handleError(apiResp)
  return apiResp
}

function handleError(promise) {
  promise.then(res => {
    let {Code, Msg} = res.data
    if (Code !== "OK") {
      message.info(Msg)
    }
  }).catch(e => {
    notification['error']({
      message: `操作失败`,
      description: `操作失败,请检查 Docker 服务是否正常`
    });
  });
}

export default {
  newNetwork,pruneNetwork
}
