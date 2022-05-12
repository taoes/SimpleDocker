import httpRequest from '../Api'
import DockerImage from "../Model/DockerImage";

function getDockerImages(): Promise<Array<DockerImage>> {
    return httpRequest.get<Array<DockerImage>>('/images/list').then(data => data.data);
}


function getImageDetail(imageId: string): Promise<DockerImage> {
    return httpRequest.get<DockerImage>(`/images/${imageId}/inspect`).then(data => data.data);
}

export {
    getDockerImages,
    getImageDetail
}