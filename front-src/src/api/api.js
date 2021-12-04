import axios from "axios";
import * as Process from "process";

axios.defaults.timeout = 3000
axios.defaults.baseURL = Process.env.ENV === 'prod' ? '/' : 'http://localhost:8080/api/';

// axios.interceptors.request.use(request => {
//
// }, error => {
//     console.error("API 请求出错", error)
// });
//
// axios.interceptors.response.use(response => {
//
//     },
//     error => {
//         console.error("API 响应出错", error)
//     }
// );

// 封装Get方法
export function get(url, params = {}) {
    return axios.get(url, {params});
}



