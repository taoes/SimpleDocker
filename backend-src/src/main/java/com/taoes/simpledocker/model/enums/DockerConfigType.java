package com.taoes.simpledocker.model.enums;

import lombok.AllArgsConstructor;

/**
 * Docker 配置类型枚举
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/22 1:49 下午
 */
@AllArgsConstructor
public enum DockerConfigType {
    LOCAL("本地服务"),
    REMOTE_SSL_AUTH("远程证书授权"),
    REMOTE_BASIC_AUTH("远程基础授权");

    private final String desc;
}
