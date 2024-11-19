package com.taoes.sd.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class PageResponse<T> extends ListResponse<T> {
    private int code;

    private String message;

    private List<T> data;
}
