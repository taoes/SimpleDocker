import {get, del} from './api'

// 镜像列表
export function list() {
    return get("/images/list");
}

// 详细详情
export function inspect(imageId) {
    return get(`/images/${imageId}/inspect`);
}

// 移除镜像接口
export function remove(imageId, values) {
    return del(`/images/${imageId}`, values)
}
