import httpRequest from '../Api'
import UserLoginRequest from "../Model/Auth/UserLoginRequest";

/**
 * 获取容器列表
 */
function login(loginRequest: UserLoginRequest): Promise<any> {
    return httpRequest.post<string>('/auth/login', loginRequest).then(data => data.data)
}


export {login}