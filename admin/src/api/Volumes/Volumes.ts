import httpRequest from '../Api'
import {DockerVolumes} from "../Model/Volumn/ListVolumes";

function getVolumes(): Promise<DockerVolumes> {
    return httpRequest.get<DockerVolumes>('/volume').then(data => data.data);
}

export {getVolumes}