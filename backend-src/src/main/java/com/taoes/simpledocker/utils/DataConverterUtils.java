package com.taoes.simpledocker.utils;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/10 6:32 下午
 */
public class DataConverterUtils {

    public static boolean parse(String content, Boolean defaultValue) {
        try {
            return Boolean.parseBoolean(content);
        } catch (Exception e) {
            return defaultValue;
        }
    }
}
