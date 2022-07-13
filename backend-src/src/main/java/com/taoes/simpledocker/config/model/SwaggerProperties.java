package com.taoes.simpledocker.config.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author manwang (569258yin)
 * @date 2022/7/14 21:16
 */
@Data
@ConfigurationProperties(prefix = "swagger")
@Component
public class SwaggerProperties {
    /**
     * 是否开启Swagger
     */
    private Boolean enable = true;

    /**
     * 文档标题
     */
    private String title = "SimpleDocker";

    /**
     * 文档描述
     */
    private String description = "SimpleDocker";

    /**
     * 文档版本
     */
    private String version = "1.0";

    /**
     * 服务条款
     */
    private String termsOfServiceUrl = "服务条款";

    /**
     * 许可证
     */
    private String license;

    /**
     * 许可证地址
     */
    private String licenseUrl;

    /**
     * 作者信息
     */
    private Contact contact = new Contact();

    @Setter
    @Getter
    public static class Contact {
        /**
         * 作者
         */
        private String name;

        /**
         * 个人网站
         */
        private String url;

        /**
         * 邮箱
         */
        private String email;
    }
}
