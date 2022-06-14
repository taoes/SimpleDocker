package com.taoes.simpledocker.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum DockerEndpointType {
  LOCAL("本地"),
  REMOTE("远程"),
  REMOTE_SSL("安全远程");

  @Getter
  private final String desc;
}
