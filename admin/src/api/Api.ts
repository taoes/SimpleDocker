import axios, {AxiosRequestConfig} from 'axios'
import WithRouter from "../router/WithRouter";
import {message} from "antd";

let config: AxiosRequestConfig = {
  baseURL: 'http://192.168.1.103:3364/api'
}
const httpRequest = axios.create(config);


httpRequest.interceptors.request.use(function (config) {
  // @ts-ignore
  config.headers.Token = " " + localStorage.getItem('token')
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


httpRequest.interceptors.response.use(function (response) {
  if (response.data.code === 401) {
    window.location.href = '/';
    return Promise.reject(response);
  }
  return  response;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
export default httpRequest;