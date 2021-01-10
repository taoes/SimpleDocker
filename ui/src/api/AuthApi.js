import axios from "axios";
import message from "ant-design-vue/lib/message";
import notification from "ant-design-vue/lib/notification";

/** 获取容器日志 */
function login(loginForm) {
  let apiResp = axios.post(`/api/system/login`, loginForm);
  handleError(apiResp)
  return apiResp
}

function resetPassword(loginForm) {

  let {oP, nP, cP} = loginForm
  if (oP.trim() === '') {
    message.warning("更新失败，原密码不正确")
    return null
  }

  if (nP.trim() === '') {
    message.warning("更新失败，新密码不能为空")
    return null
  }

  if (nP.trim() !== cP.trim()) {
    message.warning("更新失败，两次密码不一致")
    return null
  }
  let promise = axios.post(`/api/system/update/password`,
      {oldPassword: oP, newPassword: nP});
  handleError(promise)
  return promise
}

function handleError(promise) {
  promise.then(res => {
    let {Code, Msg} = res.data
    if (Code !== "OK") {
      message.info(Msg)
    }
  }).catch(e => {
    notification['error']({
      message: `操作失败`,
      description: `操作失败,请检查 Docker 服务是否正常`
    });
  });
}

export default {
  login, resetPassword
}
