package com.taoes.simpledocker.model.enums;

import lombok.Getter;

/**
 * 错误代码
 */
public enum ErrorCode {

  SYSTEM_ERROR("未知系统异常", 501001),
  DOCKER_ENDPOINT_CONNECT_ERROR("endPoint链接失败", 401001),
  PERMISSION_NOT_FOUND("无操作权限", 403001),
  ERROR_TOKEN("Token异常", 403002),
  NOT_LOGIN("未登录", 403003),
  PARAM_ERROR("参数不正确", 405001);

  @Getter
  private final String desc;

  @Getter
  private final int code;

  ErrorCode(String desc, int code) {
    this.desc = desc;
    this.code = code;
  }
}
