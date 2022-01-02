import {get, post} from './api'


// 查询容器列表
export async function list() {
    return await get("/container");
}


// 启动容器
export function operator(cId, operator, params, then, error) {
    return post(`/container/operator/${operator}`, {containerId: cId, properties: params}).then(then).catch(error);
}

// 查看容器进程
export function top(cId, psArgs, then = {}, error = {}) {
    return get(`/container/${cId}/top`, {psArgs});
}

// 查询容器详情
export function inspect(cId) {
    return get(`/container/${cId}`);
}


