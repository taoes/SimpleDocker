package com.taoes.simpledocker.model.exception;


/**
 * 基础的业务异常
 */
public abstract class BaseBizException extends RuntimeException {

  public BaseBizException() {
  }

  public BaseBizException(String message) {
    super(message);
  }
}
