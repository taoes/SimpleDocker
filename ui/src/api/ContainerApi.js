import axios from "axios";

let operationMap =
    {
      "start": "启动",
      "restart": "重启",
      "stop": "停止",
      "pause": "暂停",
      "unpause": "继续",
      "prune": "精简"
    }

function getOperatorNameByState(state) {
  let operatorName = operationMap[state]
  return !operatorName ? "未知操作" : operatorName
}

/** 获取容器日志 */
function getContainerLog(containerId) {
  let apiResp = axios.get(`/api/container/${containerId}/log`);
  apiResp.catch(e => {
    this.$notification['warning']({
      message: `操作失败`,
      description: `操作失败,请检查 Docker 服务是否正常`
    });
  });
  return apiResp
}

/** 操作容器 */
function controlContainer(containerId, state, operateName) {
  let apiResp = axios.get(`/api/container/${containerId}/${state}`)
  apiResp.catch(e => {
    this.$notification['error']({
      message: `${operateName}容器失败`,
      description: `${operateName}容器失败,请检查 Docker 服务是否正常`
    });
  });

  return apiResp;
}

/** 移除容器 */
function removeContainer(containerId, config) {
  return axios.get(`/api/container/${containerId}/delete`, {params: config})
}

/** 下载全部日志 */
function getContainerAllLog(containerId) {
  let config = {
    withCredentials: true,
    timeout: 600000
  }
  let respConfig = {responseType: 'blob'};
  return axios.create(config).get(`/api/container/${containerId}/log/all`,
      respConfig)
}

export default {
  removeContainer,
  controlContainer,
  getContainerLog,
  getContainerAllLog,
  getOperatorNameByState
}
