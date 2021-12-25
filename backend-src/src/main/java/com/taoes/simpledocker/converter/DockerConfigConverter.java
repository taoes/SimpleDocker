package com.taoes.simpledocker.converter;

import com.taoes.simpledocker.dao.bean.DockerConfigDao;
import com.taoes.simpledocker.model.DockerConfig;
import org.springframework.stereotype.Component;

/**
 * DockerConfig 的转换器
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/22 1:41 下午
 */

@Component
public class DockerConfigConverter extends AbstractConverter<DockerConfigDao, DockerConfig> {
    @Override
    public DockerConfig from(DockerConfigDao dockerConfigDao) {
        final DockerConfig config = new DockerConfig();
        config.setName(config.getName());
        config.setHost(config.getHost());
        config.setUsername(config.getUsername());
        config.setPassword(config.getPassword());
        config.setSsl(config.getSsl());
        config.setType(config.getType());
        return config;
    }

    @Override
    public DockerConfigDao to(DockerConfig dockerConfig) {
        return null;
    }
}
