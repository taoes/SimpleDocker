package com.taoes.simpledocker.config.model;

import com.github.dockerjava.api.DockerClient;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EnhanceDockerClient {

  private String clientId;

  private DockerClient client;

  public static EnhanceDockerClient of(String clientId, DockerClient client) {
    return new EnhanceDockerClient(clientId, client);
  }
}
