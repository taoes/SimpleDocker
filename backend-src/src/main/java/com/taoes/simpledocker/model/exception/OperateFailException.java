package com.taoes.simpledocker.model.exception;

/**
 * 操作失败异常
 */
public class OperateFailException extends BaseBizException {

  public OperateFailException() {
  }

  public OperateFailException(String message) {
    super(message);
  }
}
