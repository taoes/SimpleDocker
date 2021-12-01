package com.taoes.simpledocker.config;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.DockerClientConfig;
import com.taoes.simpledocker.model.DockerConfig;
import com.taoes.simpledocker.model.exception.NotFoundClientException;
import com.taoes.simpledocker.service.DockerConfigService;
import lombok.RequiredArgsConstructor;
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
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/5 12:09 上午
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class GoServiceCommand implements ApplicationContextAware, CommandLineRunner {

    private final Map<String, DockerClient> clientGroup = new HashMap<>();

    private ApplicationContext context;

    private final DockerConfigService dockerConfigService;

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
        final List<DockerConfig> dockerConfigList = dockerConfigService.list();
        for (DockerConfig dockerConfig : dockerConfigList) {
            // 初始化Docker
            log.info("初始化:{}", dockerConfig);
        }

        DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder().build();
        final DockerClient defaultClient = DockerClientBuilder.getInstance(config).build();
        clientGroup.put("DEFAULT", defaultClient);
        log.info("初始化Client内容完成,clientSize={}", clientGroup.size());

        // 启动GoLanguage服务


    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = context;
    }
}