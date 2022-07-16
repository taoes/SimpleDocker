package com.taoes.simpledocker.model.exception;

/**
 * 数据未查到错误
 */
public class DataNotFoundException extends BaseBizException {

  public DataNotFoundException() {
  }

  public DataNotFoundException(String message) {
    super(message);
  }
}
