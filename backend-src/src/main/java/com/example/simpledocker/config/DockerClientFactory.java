package com.example.simpledocker.config;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import com.example.simpledocker.model.exception.NotFoundClientException;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/5 12:09 上午
 */
@Slf4j
@Component
public class DockerClientFactory implements ApplicationContextAware, CommandLineRunner {

    private final Map<String, DockerClient> clientGroup = new HashMap<>();

    private ApplicationContext context;

    public DockerClient get() {
        final String clientId = DockerClientInterception.clientIdLocal.get();
        if (!StringUtils.hasText(clientId)) {
            return clientGroup.get("DEFAULT");
        }
        final DockerClient client = clientGroup.get(clientId.toUpperCase(Locale.ROOT));
        if (client == null) {
            throw new NotFoundClientException("客户端不存在!");
        }
        return client;
    }

    @Override
    public void run(String... args) throws Exception {
        // 读取配置
        final var config = DefaultDockerClientConfig.createDefaultConfigBuilder().build();
        final var defaultClient = DockerClientBuilder.getInstance(config).build();
        clientGroup.put("DEFAULT", defaultClient);
        log.info("初始化Client内容完成,clientSize={}", clientGroup.size());
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = context;
    }
}