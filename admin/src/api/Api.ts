import axios, {AxiosRequestConfig} from 'axios'
import {message} from "antd";

let BASE_URL = process.env.REACT_APP_BASE_URL
let config: AxiosRequestConfig = {
    baseURL: `${BASE_URL}api`
}
const httpRequest = axios.create(config);


httpRequest.interceptors.request.use(function (config) {
    // @ts-ignore
    config.headers.Token = " " + localStorage.getItem('token')
    // @ts-ignore
    config.headers.clientId = localStorage.getItem('clientId')
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


httpRequest.interceptors.response.use(function (response) {
    if (response.data.code === 401 || response.data.code === 403003) {
        message.error("用户token过期或者无效，请重新登录后尝试").then();
        console.error("用户token过期或者无效，请重新登录")
        window.location.href = '/';
        return Promise.reject(response);
    }
    return response;
}, function (error) {
    message.error("连接服务出现异常,请检查网络连接或服务器是否正常").then();
    console.error(`连接服务器出现异常信息,请检查网络连接或服务器是否正常,错误信息:${error}`)
    // 对请求错误做些什么
    return Promise.reject(error);
});
export default httpRequest;