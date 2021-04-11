import axios from "axios";
import notification from "ant-design-vue/lib/notification";

/** 获取容器日志 */
function login(loginForm) {
    let apiResp = axios.post(`/api/system/login`, loginForm);
    handleError(apiResp)
    return apiResp
}

// 重置密码
function resetPassword(loginForm) {
    let {oP, nP, cP} = loginForm
    if (oP.trim() === '') {
        notification['warning']({
            message: '操作失败',
            description: '更新失败，原密码不正确'
        })
        return null
    }

    if (nP.trim() === '') {
        notification['warning']({
            message: '操作失败',
            description: '更新失败，新密码不能为空'
        })
        return null
    }

    if (nP.trim() !== cP.trim()) {
        notification['warning']({
            message: '操作失败',
            description: '更新失败，两次密码不一致'
        })
        return null
    }
    let upData = {oldPassword: oP, newPassword: nP};
    let promise = axios.post(`/api/system/update/password`, upData);
    handleError(promise)
    return promise
}

// 异常处理逻辑
function handleError(promise) {
    promise.then(res => {
        let {Code, Msg} = res.data
        if (Code !== "OK") {
            notification['warning']({
                message: '操作失败',
                description: Msg
            })
        }
    }).catch(() => {
        notification['error']({
            message: `操作失败`,
            description: `请检查 Docker 服务是否正常`
        });
    });
}

export default {
    login, resetPassword
}
