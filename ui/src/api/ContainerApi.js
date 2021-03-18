import axios from "axios";
import message from "ant-design-vue/lib/";
import notification from "ant-design-vue/lib/notification";

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

/** 重命名容器 */
function renameContainer(containerId, newContainerName) {
    let apiResp = axios.get(`/api/container/${containerId}/rename/${newContainerName}`)
    return handleError(apiResp)
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
    let headers = {responseType: 'blob', Authorization: localStorage.token};
    return axios.create(config).get(`/api/container/${containerId}/log/all`,
        {headers})
}

function resizeContainer(containerId, execId, w, h) {
    let apiResp = axios.get(
        `/api/container/${containerId}/exec/${execId}/${w}/${h}/resize`,)
    return handleError(apiResp)

}

// 创建Exec命令
function createNewContainerExec(containerId) {
    let apiResp = axios.get(`/api/container/${containerId}/command/exec`,)
    return handleError(apiResp)

}

// 下载容器文件
function downloadFileFromContainer(containerId, filePath) {
    let config = {
        withCredentials: true,
        timeout: 600000
    }
    let respConfig = {responseType: 'blob', Authorization: localStorage.token};
    return axios.create(config).get(
        `/api/container/fs?containerId=${containerId}&filePath=${filePath}`,
        {headers: respConfig})
}

// 容器监控
function monitorContainer(containerId) {
    return axios.get(`/api/container/${containerId}/monitor/info`,)
}

function handleError(promise) {
    promise.then(res => {
        let {Code, Msg} = res.data
        if (Code !== "OK") {
            notification['warning']({
                message: '操作失败',
                description: Msg
            })
        }
    }).catch(e => {
        notification['error']({
            message: '系统API访问异常',
            description: '操作失败,请检查 Docker 服务是否正常'
        });
    });
    return promise;
}

export default {
    monitorContainer,
    resizeContainer,
    createNewContainerExec,
    removeContainer,
    controlContainer,
    getContainerLog,
    getContainerAllLog,
    getOperatorNameByState,
    downloadFileFromContainer,
    renameContainer
}
