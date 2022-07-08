import httpRequest from '../Api'
import DockerImage from "../Model/DockerImage";
import {Base} from "../Base";

/* 获取所有的镜像列表 */
function getDockerImages(searchKey:string): Promise<Base<Array<DockerImage>>> {
  return httpRequest.get<Base<Array<DockerImage>>>(`/images/list?searchKey=${searchKey}`).then(data => data.data);
}


/* 获取镜像详情 */
function getImageDetail(imageId: any): Promise<DockerImage> {
  return httpRequest.get<DockerImage>(`/images/${imageId}/inspect`).then(data => data.data);
}

/* 给镜像重新标记 */
async function  reTagImage(imageId: String, newTag: string): Promise<Base<Boolean>> {
  return await httpRequest.post("/images/update/tag", {imageId, newTag}).then(data => data.data);
}

/**
 * 删除镜像
 */

function removeImage(imageId:string,force:boolean) :Promise<Base<Boolean>>{
  return httpRequest.delete(`/images/${imageId}?force=${force}`).then(data => data.data);
}


export {
  getDockerImages,
  getImageDetail,
  reTagImage,
  removeImage
}