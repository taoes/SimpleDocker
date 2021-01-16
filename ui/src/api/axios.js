import axios from "axios";
import Config from "@/api/Config";
import router from "@/router";
import jwtDecode from "jwt-decode";

axios.defaults.baseURL = Config.HOST
axios.interceptors.request.use(config => {
  if (config.url === '/api/system/login') {
    return config
  }
  if (!localStorage.token) {
    router.push("/").then()
    return Promise.reject()
  } else {
    let tokenStr = localStorage.token;
    let token = jwtDecode(tokenStr)
    if (new Date(token.exp).getTime() < new Date().getTime()) {
      localStorage.setItem("token", "")
      router.push("/").then()
      return Promise.reject()
    } else {
      config.headers.Authorization = localStorage.token;
      return config
    }
  }
});

axios.interceptors.response.use(res => {
  return res;
}, err => {
  if (err.response.status === 403) {
    console.log("接到到未授权的请求")
    router.push("/").then()
  } else {
    return Promise.resolve(res)
  }
});

export default axios;