package com.example.simpledocker.config;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import com.example.simpledocker.model.exception.NotFoundClientException;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;
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

    private final Map<String, DockerHttpClient> httpClientGroup = new HashMap<>();

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

    public DockerHttpClient getHttpClient() {
        final String clientId = DockerClientInterception.clientIdLocal.get();
        if (!StringUtils.hasText(clientId)) {
            return httpClientGroup.get("DEFAULT-HTTP");
        }
        final DockerHttpClient httpClient = httpClientGroup.get(clientId.toUpperCase(Locale.ROOT));
        if (httpClient == null) {
            throw new NotFoundClientException("客户端不存在!");
        }
        return httpClient;
    }

    @Override
    public void run(String... args) throws Exception {
        // 读取配置

        DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder().build();
        final var defaultClient = DockerClientBuilder.getInstance(config).build();
        clientGroup.put("DEFAULT", defaultClient);

        DockerHttpClient defaultHttpClient = new ApacheDockerHttpClient.Builder()
            .sslConfig(config.getSSLConfig())
            .dockerHost(config.getDockerHost()).build();
        httpClientGroup.put("DEFAULT-HTTP", defaultHttpClient);

        log.info("初始化Client内容完成,clientSize={}", clientGroup.size());
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = context;
    }
}
