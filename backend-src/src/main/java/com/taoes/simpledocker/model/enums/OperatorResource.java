package com.taoes.simpledocker.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 操作资源类型
 */
@AllArgsConstructor
public enum OperatorResource {
  IMAGE_v1("操作镜像"),
  CONTAINER_v1("操作容器"),
  VOLUME_v1("操作储存卷"),
  NETWORK_v1("操作网络");

  @Getter
  private final String desc;

}
