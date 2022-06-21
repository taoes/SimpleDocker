package com.taoes.simpledocker.config;

import static java.lang.String.format;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.taoes.simpledocker.model.DockerEndpoint;
import com.taoes.simpledocker.model.enums.DockerEndpointType;
import com.taoes.simpledocker.model.exception.NotFoundClientException;
import com.taoes.simpledocker.service.DockerEndpointService;
import com.taoes.simpledocker.service.GoProgramRunner;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
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
public class DockerClientFactory implements ApplicationContextAware, CommandLineRunner {

  private final Map<String, DockerClient> clientGroup = new HashMap<>();

  private ApplicationContext context;

  @Autowired
  private DockerEndpointService dockerEndpointService;

  @Autowired
  private GoProgramRunner goProgramRunner;

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

  public DockerClient get(String clientId) {
    final DockerClient client = clientGroup.get(clientId.toUpperCase(Locale.ROOT));
    if (client == null) {
      throw new NotFoundClientException("客户端不存在!");
    }
    return client;
  }

  @Override
  public void run(String... args) throws Exception {
    // 读取配置
    final List<DockerEndpoint> endpoints = dockerEndpointService.list();
    for (DockerEndpoint endpoint : endpoints) {
      if (endpoint.getType() == DockerEndpointType.LOCAL) {
        ApacheDockerHttpClient httpClient = new ApacheDockerHttpClient.Builder()
            .dockerHost(new URI("unix:///var/run/docker.sock"))
            .build();
        DockerClient client = DockerClientBuilder.getInstance().withDockerHttpClient(httpClient).build();
        clientGroup.put(endpoint.getId(), client);
      }

      if (endpoint.getType() == DockerEndpointType.REMOTE) {
        ApacheDockerHttpClient httpClient = new ApacheDockerHttpClient.Builder()
            .dockerHost(new URI(format("tcp://%s:%s", endpoint.getHost(), endpoint.getPort())))

            .build();
        DockerClient client = DockerClientBuilder.getInstance().withDockerHttpClient(httpClient).build();
        clientGroup.put(endpoint.getId(), client);
      }
    }

    log.info("初始化Client内容完成,clientSize={}", clientGroup.size());

  }

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    this.context = context;
  }

  /**
   * TODO 通过配置查询到Code
   *
   * @param code docker 配置的code
   * @return 该code对应的客户端
   */
  public DockerClient findByCode(String code) {
    return clientGroup.get(code);
  }
}
