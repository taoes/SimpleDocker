import axios from "axios";

/** 获取容器日志 */
function login(loginForm) {
  let apiResp = axios.post(`/api/system/login`, loginForm);
  apiResp.catch(e => {
    this.$notification['warning']({
      message: `操作失败`,
      description: `操作失败,请检查 Docker 服务是否正常`
    });
  });
  return apiResp
}

export default {
  login
}
