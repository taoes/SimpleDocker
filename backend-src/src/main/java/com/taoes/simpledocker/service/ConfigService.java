package com.taoes.simpledocker.service;

import java.util.Map;
import java.util.Set;

/**
 * 配置服务
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/15 1:23 下午
 */
public interface ConfigService {

    /**
     * 通过Key查询配置
     *
     * @param keys 配置KEY
     * @return KEY & VALUE
     */
    Map<String, String> findConfigByKeys(Set<String> keys);

    /**
     * 保存配置信息
     *
     * @param configGroup 配置信息
     */
    void save(Map<String, String> configGroup);

    /**
     * 清除配置
     *
     * @param cleanKeys 需要清除的Key
     */
    void cleanByKeys(Set<String> cleanKeys);
}
