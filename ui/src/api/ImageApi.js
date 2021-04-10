import axios from "axios";
import notification from "ant-design-vue/lib/notification";
import message from "ant-design-vue/lib/message";

function runNewContainer(containerConfig) {
    let promise = axios.get(`/api/container/run`, {params: containerConfig})
    handleError(promise)
    return promise
}


function getImageInfo(imageId) {
    return axios.get(`/api/image/${imageId}`)
}


function pruneImage() {
    let promise = axios.delete('/api/image/prune');
    handleError(promise)
    return promise;
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
    runNewContainer: runNewContainer,
    pruneImage: pruneImage,
    getImageInfo: getImageInfo
}
