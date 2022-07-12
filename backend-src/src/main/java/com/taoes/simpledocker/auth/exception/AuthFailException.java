package com.taoes.simpledocker.auth.exception;

import com.taoes.simpledocker.model.exception.BaseBizException;
import lombok.Data;

@Data
public class AuthFailException extends BaseBizException {

    public AuthFailException() {
    }

    public AuthFailException(String message) {
        super(message);
    }

    public AuthFailException(String message, Throwable cause) {
        super(message, cause);
    }
}
