package com.taoes.simpledocker.service.imple;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateVolumeResponse;
import com.github.dockerjava.api.command.InspectVolumeResponse;
import com.github.dockerjava.api.command.ListVolumesResponse;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.service.VolumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2022/1/1 3:50 PM
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class VolumeServiceImpl implements VolumeService {

  private DockerClientFactory clientFactory;

  @Override
  public ListVolumesResponse list() {
    final DockerClient client = clientFactory.get();
    return client.listVolumesCmd().exec();
  }

  @Override
  public CreateVolumeResponse create(String name, String driver) {
    return clientFactory.get().createVolumeCmd()
        .withDriver(driver)
        .withName(name)
        .exec();
  }

  @Override
  public InspectVolumeResponse inspect(String name) {
    final DockerClient client = clientFactory.get();
    return client.inspectVolumeCmd(name).exec();
  }

  @Override
  public void remove(String name) {
    final DockerClient client = clientFactory.get();
    client.removeVolumeCmd(name).exec();
    log.info("移除卷:{}完成", name);
  }
}
