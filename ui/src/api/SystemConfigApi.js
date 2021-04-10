import axios from "axios";
import message from "ant-design-vue/lib/message";
import notification from "ant-design-vue/lib/notification";

function saveDockerConfig(config) {
    let promise = axios.post('/api/system/safe', config)
    handleError(promise)
    return promise
}

function getDockerConfig() {
    let promise = axios.get('/api/system/safe')
    handleError(promise)
    return promise
}

function saveNotifyConfig(config) {
    let promise = axios.post('/api/system/notify', config)
    handleError(promise)
    return promise
}

function getNotifyConfig() {
    let promise = axios.get('/api/system/notify')
    handleError(promise)
    return promise
}

function testNotifyUrl(url) {
    let promise = axios.get(`/api/notify/test?url=${url}`)
    handleError(promise)
    return promise
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
    saveDockerConfig,
    getDockerConfig,
    saveNotifyConfig,
    getNotifyConfig,
    testNotifyUrl
}
