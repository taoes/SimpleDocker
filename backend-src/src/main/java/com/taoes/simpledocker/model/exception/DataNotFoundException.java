package com.taoes.simpledocker.model.exception;

/**
 * 参数检查异常
 */
public class DataNotFoundException extends BaseBizException {

  public DataNotFoundException() {
  }

  public DataNotFoundException(String message) {
    super(message);
  }
}
