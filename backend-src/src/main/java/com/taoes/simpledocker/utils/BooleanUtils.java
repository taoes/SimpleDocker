package com.taoes.simpledocker.utils;

import org.springframework.util.StringUtils;

/**
 * 布尔类型的工具类
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/10 6:32 下午
 */
public class BooleanUtils {

    public static Boolean parse(String content, Boolean defaultValue) {
        try {
            if (StringUtils.hasText(content)) {
                return Boolean.parseBoolean(content);
            }
            return defaultValue;
        } catch (Exception e) {
            return defaultValue;
        }
    }
}
