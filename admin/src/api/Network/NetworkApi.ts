import httpRequest from '../Api'
import DockerNetwork from "../Model/Network/DockerNetwork";
import {Base} from "../Base";

function getNetworkList(): Promise<Base<Array<DockerNetwork>>> {
    return httpRequest.get<Base<Array<DockerNetwork>>>('/network/list').then(data => data.data);
}

export {getNetworkList}