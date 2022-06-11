package com.taoes.simpledocker.model;

import com.taoes.simpledocker.model.enums.OperatorResource;
import lombok.Data;

@Data
public class OperateRecord {

  private Long clientId;

  private Long userId;

  private String name;

  private OperatorResource resource;

  private Object content;
}
