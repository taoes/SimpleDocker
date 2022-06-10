package com.taoes.simpledocker.controller.container;

import cn.hutool.core.collection.CollUtil;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * 运行新的容器的请求对象
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/5 1:18 上午
 */
@Data
public class RunNewContainerRequest {

    /**
     * 使用的镜像ID
     */
    private String imageId;

    /**
     * 容器名称
     */
    private String containerName;

    /**
     * 环境变量
     */
    private Map<String, String> envGroup;

    /**
     * 端口绑定
     */
    private Map<Long, Long> portBound;

    /**
     * DNS
     */
    private String dns;

    /**
     * 容器别名
     */
    private String alias;

    /**
     * 主机名
     */
    private String hostname;


    public List<String> findEnvList() {
        if (CollUtil.isEmpty(this.envGroup)) {
            return Collections.emptyList();
        }
        List<String> envs = CollUtil.newArrayList();
        for (Map.Entry<String, String> entry : this.envGroup.entrySet()) {
            envs.add(String.format("%s=%s", entry.getKey(), entry.getValue()));
        }
        return envs;
    }
}
