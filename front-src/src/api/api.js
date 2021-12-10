import axios from "axios";


axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://localhost:3364/api/';

// axios.interceptors.request.use(request => {

// }, error => {
//     console.error("API 请求出错", error)
// });

// axios.interceptors.response.use(response => {

//     },
//     error => {
//         console.error("API 响应出错", error)
//     }
// );

// 封装Get方法
export function get(url, params = {}) {
    return axios.get(url, {params});
}


// 封装Post方法
export function post(url, params = {}) {
    return axios.post(url, params);
}




