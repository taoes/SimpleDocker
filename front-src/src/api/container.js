import {get, post} from './api'

export async function getContainerList() {
    return await get("/container/list");
}


// 启动容器
export function operatorContainerApi(cId, operator, params, then, error) {
    return post(`/container/operator/${operator}`, {containerId: cId, params}).then(then).catch(error);
}


