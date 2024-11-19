import axios from "axios";
import { message } from "antd";

// const [messageApi, contextHolder] = message.useMessage();
const httpClient = axios.create({
    baseURL: 'https://draw-x.com/api',
    timeoutErrorMessage: '服务请求超时,请稍后重试',
    timeout: 10000
});

httpClient.interceptors.request.use(config => {
    let token = localStorage.getItem('Token') || "no-valid-token"
    config.headers.token = token;
    return config
}, error => { });

httpClient.interceptors.response.use(
    resp => resp.data,
    error => {
        let errorMsg = error.message
        if (error && error.status) {
            switch (error.status) {
                case 401:
                    errorMsg = '未登录，请先登录'
                    break;
                case 403:
                    errorMsg = '您没有权限操作！'
                    break;
                case 404:
                    errorMsg = '请求不存在!'
                    break;
            }
        }

        message.open({
            type: 'error',
            content: errorMsg,
        });
        return Promise.reject(error);
    });

function request(params) {
    return httpClient.request(params)
}

export async function get(url, params) {
    return request({ method: 'GET', url, params })
}

export async function post(url, data) {
    return request({ method: 'POST', url, data })
}

export async function put(url, data) {
    return request({ method: 'PUT', url, data })
}