import httpRequest from '../Api'
import DockerNetwork from "../Model/Network/DockerNetwork";

function getNetworkList(): Promise<Array<DockerNetwork>> {
    return httpRequest.get<Array<DockerNetwork>>('/network/list').then(data => data.data);
}

export {getNetworkList}