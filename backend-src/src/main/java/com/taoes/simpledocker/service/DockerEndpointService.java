package com.taoes.simpledocker.service;

import com.taoes.simpledocker.model.DockerEndpoint;
import java.util.List;

/**
 * docker 服务
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:23 下午
 */
public interface DockerEndpointService {



  /**
   * 监控服务
   */
  void monitor();

  /**
   * docker 端列表
   */
  List<DockerEndpoint> list();
}
