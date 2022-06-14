package com.taoes.simpledocker.model;

import com.taoes.simpledocker.model.enums.DockerEndpointState;
import com.taoes.simpledocker.model.enums.DockerEndpointType;
import java.util.Optional;
import lombok.Data;

@Data
public class DockerEndpoint {

  private String id;

  private String name;

  private DockerEndpointType type;

  private DockerEndpointState state = DockerEndpointState.NORMAL;

  private String host;

  private Integer port;

  private String latestTestTime;

  private String createdAt;

  private String updatedAt;

  public String getTypeName(){
    return Optional.ofNullable(this.type).map(DockerEndpointType::getDesc).orElse("未知");
  }

  public String getStateName(){
    return Optional.ofNullable(this.state).map(DockerEndpointState::getDesc).orElse("未知");
  }
}
