package com.taoes.simpledocker.controller.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 用户重置密码信息
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/21 11:13 下午
 */

@Data
@AllArgsConstructor
public class UserResetRequest {

    private String username;

    private String password;

    private String newPassword;

    /**
     * 信息是否均正确
     *
     * @return 检查参数
     */

    public boolean checkParam() {
        return this.username != null && this.password != null && this.newPassword != null;
    }
}
