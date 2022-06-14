import httpRequest from '../Api'
import DockerContainer from "../Model/DockerContainer";
import {Base} from "../Base";

/**
 * 获取容器列表
 */
function getContainers(): Promise<Base<Array<DockerContainer>>> {
  return httpRequest.get<Base<Array<DockerContainer>>>('/container').then(data => data.data);
}

/**
 * 获取容器详情
 */
function getContainerDetail(containerId: string): Promise<DockerContainer> {
  return httpRequest.get<DockerContainer>(`/container/${containerId}`).then(data => data.data);
}

/**
 * 操作容器
 */
function updateContainer(containerId: string, operateName: string): Promise<boolean> {
  let data = {
    containerId: containerId
  }
  return httpRequest.post<boolean>(`/container/operator/${operateName}`, data).then(data => data.data);
}


export {getContainers, getContainerDetail, updateContainer}