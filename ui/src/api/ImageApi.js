import axios from "axios";
import notification from "ant-design-vue/lib/notification";

function runNewContainer(containerConfig) {
    let promise = axios.get(`/api/container/run`, {params: containerConfig})
    handleError(promise)
    return promise
}


function getImageInfo(imageId) {
    return axios.get(`/api/image/${imageId}`)
}


// 精简镜像
function pruneImage() {
    let promise = axios.delete('/api/image/prune');
    handleError(promise)
    return promise;
}


// 重命名镜像
function renameImage(data) {
    let promise = axios.get(`/api/image/tag`, {params: data})
    handleError(promise)
    return promise
}

// 备份镜像数据
function backImageToLocal(imageTag) {
    let params = {imageTag}
    let promise = axios.get('/api/image/save/to/local', {params: params})
    handleError(promise)
    return promise
}

function handleError(promise) {
    promise.then(res => {
        let {Code, Msg} = res.data
        if (Code !== "OK") {
            notification['warning']({
                message: `操作失败`,
                description: Msg
            });
        }
    }).catch(e => {
        console.log(`访问出现异常:${e}`)
        notification['error']({
            message: `操作失败`,
            description: `操作失败,请检查 Docker 服务是否正常`
        });
    });
}

export default {
    runNewContainer,
    pruneImage,
    getImageInfo,
    renameImage,
    backImageToLocal
}
