import {get, post,del} from './api'


// 查询卷
export function getVolumeList() {
    return get("/volume");
}

/**
 * 创建存储卷
 * @returns {Promise<AxiosResponse<any>>}
 */
export function create(param) {
    return post("/volume", param);
}

// 卷详情
export function inspectVolume(name) {
    return get(`volume/${name}`)
}

// 移除卷
export function removeVolume(name) {
    return del(`/volume/${name}`);
}
