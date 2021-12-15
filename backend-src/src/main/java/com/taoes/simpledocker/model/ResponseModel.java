package com.taoes.simpledocker.model;

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

    /**
     * 失败的数据
     *
     * @param data 数据
     * @param <T>  泛型
     * @return 失败的包裹数据
     */
    public static <T> ResponseModel fail(T data) {
        return new ResponseModel();
    }

    /**
     * 成功
     *
     * @param <T> 泛型对象
     * @return 包裹后的数据
     */
    public static <T> ResponseModel<T> ok(T t) {
        final ResponseModel<T> model = new ResponseModel<>();
        model.setData(t);
        model.setCode(0);
        return model;
    }
}
