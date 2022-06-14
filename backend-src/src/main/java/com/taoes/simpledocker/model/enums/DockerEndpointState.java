package com.taoes.simpledocker.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum DockerEndpointState {
  NORMAL("正常"),
  NOT_CONNECT("无法连接"),
  AUTH_FAIL("授权失败");

  @Getter
  private final String desc;
}
