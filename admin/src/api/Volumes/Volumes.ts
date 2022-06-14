import httpRequest from '../Api'
import {DockerVolumes} from "../Model/Volumn/ListVolumes";
import {Base} from "../Base";

function getVolumes(): Promise<Base<DockerVolumes>> {
    return httpRequest.get<Base<DockerVolumes>>('/volume').then(data => data.data);
}

export {getVolumes}