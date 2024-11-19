import { get, post } from "./client"

/**
 * 获取验证码信息
 * @returns 获取到的验证码和凭证
 */
export async function fetchCaptchaApi() {
    return post('/auth/registry/code', {})
}

/**
 * 请求登录信息
 * @param {登录参数} params 
 * @returns 登录的结果信息
 */
export async function loginApi(params) {
    return post('/auth/login', params)
}