package com.taoes.simpledocker.model.exception;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/5 12:24 上午
 */
public class NotFoundClientException extends RuntimeException {
    public NotFoundClientException(String message) {
        super(message);
    }

    public NotFoundClientException(String message, Throwable cause) {
        super(message, cause);
    }
}
