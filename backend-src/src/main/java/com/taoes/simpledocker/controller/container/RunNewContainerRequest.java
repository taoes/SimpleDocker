package com.taoes.simpledocker.controller.container;

import java.util.Map;

import lombok.Data;

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

}
