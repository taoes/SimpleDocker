import httpRequest from '../Api'
import {Base} from "../Base";
import DockerEndpoint from "../Model/DockerEndpoint";

/**
 * 获取容器列表
 */
async function endpointList(): Promise<Base<Array<DockerEndpoint>>> {
    return httpRequest.get<Base<Array<DockerEndpoint>>>('/endpoint').then(data => data.data);
}


function testEndpoint(clientId: string): Promise<Base<boolean>> {
    return httpRequest.get<Base<boolean>>(`/endpoint/${clientId}/test/connect`).then(data => data.data);
}

export {endpointList, testEndpoint}