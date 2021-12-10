package com.example.simpledocker.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/9 10:33 下午
 */
public class JsonUtils {

    private final static ObjectMapper mapper = new ObjectMapper();

    static {

    }

    public static String toJsonString(Object obj) {
        try {
            return mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "";
        }
    }
}
