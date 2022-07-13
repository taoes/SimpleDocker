package com.taoes.simpledocker.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/9 10:33 下午
 */
@Slf4j
public class JsonUtils {

    private final static ObjectMapper MAPPER = new ObjectMapper();

    static {

    }

    public static String toJsonString(Object obj) {
        try {
            return MAPPER.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("{}对象转json字符串失败", obj, e);
            return StringUtils.EMPTY;
        }
    }

    /**
     * 将json数据转换成pojo对象list
     * <p>Title: jsonToList</p>
     * <p>Description: </p>
     *
     * @param jsonData
     * @param beanType
     * @return
     */
    public static <T> List<T> jsonToList(String jsonData, Class<T> beanType) {
        JavaType javaType = MAPPER.getTypeFactory().constructParametricType(List.class, beanType);
        try {
            return MAPPER.readValue(jsonData, javaType);
        } catch (Exception e) {
            log.error("解析json出错json={}", jsonData, e);
        }

        return null;
    }

    private static JavaType getJavaType(Class<?> clas, Class<?>... parameterClasses) {
        return MAPPER.getTypeFactory().constructParametricType(clas, parameterClasses);
    }
}
