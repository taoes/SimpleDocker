package com.taoes.simpledocker.service.imple;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.command.TopContainerResponse;
import com.github.dockerjava.api.model.Bind;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.HostConfig;
import com.github.dockerjava.api.model.Link;
import com.github.dockerjava.api.model.PortBinding;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.controller.container.RunNewContainerRequest;
import com.taoes.simpledocker.model.OperateRecord;
import com.taoes.simpledocker.model.enums.OperatorResource;
import com.taoes.simpledocker.service.ContainerService;
import com.taoes.simpledocker.service.OperateRecordService;
import com.taoes.simpledocker.utils.BooleanUtils;
import com.taoes.simpledocker.utils.JsonUtils;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 容器服务实现类
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/10 11:40 下午
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ContainerServiceImpl implements ContainerService {

  private final DockerClientFactory clientFactory;

  private final OperateRecordService operateRecordService;

  @Override
  public List<Container> list(boolean showAll) {
    final DockerClient client = clientFactory.get();
    return client.listContainersCmd().withShowAll(showAll).exec();
  }

  @Override
  public CreateContainerResponse run(RunNewContainerRequest request) {
    final DockerClient client = clientFactory.get();
    HostConfig hostConfig = HostConfig.newHostConfig();
    hostConfig.withBinds(Bind.parse("/host:/container:ro"))
        .withPortBindings(PortBinding.parse("12:44")).withLinks(Link.parse(""))
        .withDns(request.getDns()).withNetworkMode("网络名");

    final CreateContainerResponse response = client
        .createContainerCmd(request.getImageId())
        .withAliases(request.getAlias())
        .withHostConfig(hostConfig)
        .withEnv(request.findEnvList())
        .withName(request.getContainerName())
        .withHostName(request.getHostname()).exec();
    return response;
  }

  @Override
  public void start(String containerId) {
    final DockerClient client = clientFactory.get();
    client.startContainerCmd(containerId).exec();
    log.info("启动容器,containerId={}", containerId);

    // 记录日志
    saveRecord(containerId, "启动容器");

  }


  private void saveRecord(String containerId, String type) {
    try {
      Map<String, String> param = new HashMap<>();
      param.put("containerId", containerId);
      param.put("type", type);

      OperateRecord record = new OperateRecord();
      record.setUserId(0L)
          .setClientId(1L)
          .setContent(JsonUtils.toJsonString(param))
          .setName("未知")
          .setResource(OperatorResource.CONTAINER_v1);
      operateRecordService.add(record);
    } catch (Exception ignore) {
    }
  }

  @Override
  public void stop(String containerId) {
    final DockerClient client = clientFactory.get();
    client.stopContainerCmd(containerId).exec();
    log.info("停止容器,containerId={}", containerId);
    saveRecord(containerId, "停止容器");
  }

  @Override
  public void pause(String containerId) {
    final DockerClient client = clientFactory.get();
    client.pauseContainerCmd(containerId).exec();
    log.info("暂停容器,containerId={}", containerId);
    saveRecord(containerId, "暂停容器");
  }

  @Override
  public void unpause(String containerId) {
    final DockerClient client = clientFactory.get();
    client.unpauseContainerCmd(containerId).exec();
    log.info("继续容器,containerId={}", containerId);
    saveRecord(containerId, "恢复容器");
  }

  @Override
  public void remove(String containerId, Map<String, String> params) {
    final String force = params.get("force");
    final String removeVolume = params.get("removeVolume");

    final DockerClient client = clientFactory.get();
    client.removeContainerCmd(containerId).withForce(BooleanUtils.parse(force, false))
        .withRemoveVolumes(BooleanUtils.parse(removeVolume, false)).exec();
    log.info("移除容器,containerId={} params={}", containerId, params);

    saveRecord(containerId, "移除容器");
  }

  @Override
  public void rename(String containerId, String newName) {
    final DockerClient dockerClient = clientFactory.get();
    dockerClient.renameContainerCmd(containerId).withName(newName).exec();
    log.info("重命名容器:[{}]为[{}]", containerId, newName);
    saveRecord(containerId, "重命名容器");
  }

  @Override
  public TopContainerResponse top(String containerId, String psArgs) {
    final DockerClient dockerClient = clientFactory.get();
    return dockerClient.topContainerCmd(containerId).withPsArgs(psArgs).exec();
  }

  @Override
  public InspectContainerResponse inspect(String containerId) {
    final DockerClient client = clientFactory.get();
    final InspectContainerResponse response =
        client.inspectContainerCmd(containerId).withSize(Boolean.TRUE).exec();
    saveRecord(containerId, "Inspect容器");
    return response;
  }
}
