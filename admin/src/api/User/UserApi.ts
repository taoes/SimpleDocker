import httpRequest from '../Api'
import User from "../Model/User";

interface UserResp {
  code:number
  data:Array<User>
  msg:string
}

/**
 * 获取容器列表
 */
function userList(): Promise<UserResp> {
  return httpRequest.get<UserResp>('/user').then(data => data.data);
}

export {userList}