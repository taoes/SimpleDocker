package com.taoes.sd.model;

import lombok.Data;

@Data
public class BaseResponse<T> {

    private int code;

    private String message;

    private T data;

    public static BaseResponse<?> success() {
        return new BaseResponse<>();
    }


    public static <T> BaseResponse<T> success(T data) {
        BaseResponse<T> response = new BaseResponse<>();
        response.setData(data);
        return response;
    }
}
