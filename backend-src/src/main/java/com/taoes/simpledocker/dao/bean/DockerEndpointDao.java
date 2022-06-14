package com.taoes.simpledocker.dao.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.taoes.simpledocker.model.enums.DockerEndpointState;
import com.taoes.simpledocker.model.enums.DockerEndpointType;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@TableName("docker_endpoint")
public class DockerEndpointDao {

  /**
   * ID
   */
  @TableId(type = IdType.INPUT)
  private String id;

  /**
   * 名称
   */
  private String name;

  /**
   * 类型
   */
  private DockerEndpointType type;

  /**
   * 状态
   */
  private DockerEndpointState state;

  /**
   * 主机地址
   */
  private String host;

  /**
   * 端口
   */
  private Integer port;


  /**
   * 上次检查时间
   */
  private LocalDateTime latestTestTime;

  /**
   * 创建时间
   */
  private LocalDateTime createdAt;

  /**
   * 更新时间
   */
  private LocalDateTime updatedAt;


}
