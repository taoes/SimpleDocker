package com.taoes.simpledocker.model.exception;

/**
 * 参数检查异常
 */
public class ParamCheckException extends BaseBizException {

  public ParamCheckException() {
  }

  public ParamCheckException(String message) {
    super(message);
  }
}
