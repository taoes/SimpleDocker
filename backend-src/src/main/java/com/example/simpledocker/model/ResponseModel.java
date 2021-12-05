package com.example.simpledocker.model;

import lombok.Data;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/5 12:26 上午
 */
@Data
public class ResponseModel<T> {
    private String msg;

    private T data;

    private int code;

    public static <T> ResponseModel fail(T data){
        return new ResponseModel();
    }
}
