package com.taoes.simpledocker.controller.auth;

import lombok.Data;

/**
 * 用户登录信息
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/21 11:13 下午
 */

@Data
public class UserLoginRequest {

  private String username;

  private String password;
}
