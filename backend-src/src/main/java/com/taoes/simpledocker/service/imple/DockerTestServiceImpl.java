package com.taoes.simpledocker.service.imple;

import com.github.dockerjava.api.DockerClient;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.service.DockerTestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DockerTestServiceImpl implements DockerTestService {

  private final DockerClientFactory factory;

  @Override
  public Void ping() {
    final DockerClient client = factory.get();
    return client.pingCmd().exec();
  }


}
