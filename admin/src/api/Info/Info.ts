import httpRequest from '../Api'
import DockerServerInfo from "../Model/DockerInfo";

function GetDockerInfo(): Promise<DockerServerInfo> {
    return httpRequest.get<DockerServerInfo>('/info').then(data => data.data);
}

export {GetDockerInfo}