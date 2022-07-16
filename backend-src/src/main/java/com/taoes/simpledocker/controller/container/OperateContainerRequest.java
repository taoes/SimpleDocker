package com.taoes.simpledocker.controller.container;

import java.util.Collections;
import java.util.Map;

import lombok.Data;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/5 1:18 上午
 */
@Data
public class OperateContainerRequest {

    /**
     * 操作的容器
     */
    private String containerId;

    /**
     * 操作选项
     */
    private Map<String, String> properties;

    public Map<String, String> findProperties() {
        final Map<String, String> properties = this.getProperties();
        if (properties == null) {
            return Collections.emptyMap();
        }
        return properties;
    }
}
