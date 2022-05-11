import {get, del, post} from './api'

// 镜像列表
export function list() {
    return get("/images/list").then(resp => resp.data)
}

// 详细详情
export function inspect(imageId) {
    return get(`/images/${imageId}/inspect`);
}

// 移除镜像接口
export function remove(imageId, values) {
    return del(`/images/${imageId}`, values)
}

// 清理镜像
export function prune() {
    return post('/images/prune')
}
