import httpRequest from '../Api'
import DockerImage from "../Model/DockerImage";
import {Base} from "../Base";

/* 获取所有的镜像列表 */
function getDockerImages(): Promise<Base<Array<DockerImage>>> {
  return httpRequest.get<Base<Array<DockerImage>>>('/images/list').then(data => data.data);
}


/* 获取镜像详情 */
function getImageDetail(imageId: any): Promise<DockerImage> {
  return httpRequest.get<DockerImage>(`/images/${imageId}/inspect`).then(data => data.data);
}

/* 给镜像重新标记 */
function reTagImage(imageId: String, newTag: string): Promise<Base<Boolean>> {
  return httpRequest.post("/images/update/tag", {imageId, newTag}).then(resp => resp.data)
}


export {
  getDockerImages,
  getImageDetail,
  reTagImage
}