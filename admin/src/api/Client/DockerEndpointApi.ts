import httpRequest from '../Api'
import DockerContainer from "../Model/DockerContainer";
import {Base} from "../Base";
import DockerEndpoint from "../Model/DockerEndpoint";

/**
 * 获取容器列表
 */
async  function endpointList(): Promise<Base<Array<DockerEndpoint>>> {
  return httpRequest.get<Base<Array<DockerEndpoint>>>('/endpoint').then(data => data.data);
}

export {endpointList}