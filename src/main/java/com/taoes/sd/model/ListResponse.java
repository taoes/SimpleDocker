package com.taoes.sd.model;

import lombok.Data;

import java.util.List;

@Data
public class ListResponse<T> {
    private int code;

    private String message;

    private List<T> data;

    public static <T> ListResponse<T> success(List<T> data) {
        ListResponse<T> response = new ListResponse<>();
        response.setData(data);
        return response;
    }


}
