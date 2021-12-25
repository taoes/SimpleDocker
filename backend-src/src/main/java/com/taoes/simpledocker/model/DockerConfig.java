package com.taoes.simpledocker.model;

import com.taoes.simpledocker.model.enums.DockerConfigType;
import lombok.Data;

/**
 * Docker配置信息
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:26 下午
 */
@Data
public class DockerConfig {

    /**
     * 配置名
     */
    private String name;

    /**
     * 主机地址
     */
    private String host;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * ssl
     */
    private Boolean ssl;

    /**
     * docker 配置的类型
     */
    private DockerConfigType type;

}
