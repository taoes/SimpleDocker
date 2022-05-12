import httpRequest from '../Api'
import DockerContainer from "../Model/DockerContainer";

/**
 * 获取容器列表
 */
function getContainers(): Promise<Array<DockerContainer>> {
    return httpRequest.get<Array<DockerContainer>>('/container').then(data => data.data);
}

/**
 * 获取容器详情
 */
function getContainerDetail(containerId: string): Promise<DockerContainer> {
    return httpRequest.get<DockerContainer>(`/container/${containerId}`).then(data => data.data);
}

export {getContainers, getContainerDetail}