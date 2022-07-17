import httpRequest from '../Api'
import User from "../Model/User";
import UserCreatedRequest from "../Model/Auth/UserCreatedRequest";
import {Base} from "../Base";

interface UserResp {
    code: number
    data: Array<User>
    msg: string
}

/**
 * 获取用户列表
 */
function userList(): Promise<Base<Array<User>>> {
    return httpRequest.get<Base<Array<User>>>('/user').then(data => data.data);
}

/**
 * 创建新的用户
 */
function createNewUser(req: UserCreatedRequest): Promise<Base<Boolean>> {
    return httpRequest.post<Base<Boolean>>(`/user`, req).then(data => data.data);
}


/**
 * 移除用户
 */
function removeUserApi(id: number): Promise<Base<Boolean>> {
    return httpRequest.delete(`/user/${id}`).then(data => data.data);
}

export {userList, createNewUser,removeUserApi}