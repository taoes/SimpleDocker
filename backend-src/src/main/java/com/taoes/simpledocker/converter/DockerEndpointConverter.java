package com.taoes.simpledocker.converter;

import com.taoes.simpledocker.dao.bean.DockerEndpointDao;
import com.taoes.simpledocker.model.DockerEndpoint;
import com.taoes.simpledocker.utils.TimeUtils;
import org.springframework.stereotype.Component;

/**
 * DockerEndpoint 的转换器
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/22 1:41 下午
 */

@Component
public class DockerEndpointConverter extends AbstractConverter<DockerEndpointDao, DockerEndpoint> {

  @Override
  public DockerEndpoint from(DockerEndpointDao dao) {
    return new DockerEndpoint()
        .setId(dao.getId())
        .setName(dao.getName())
        .setState(dao.getState())
        .setHost(dao.getHost())
        .setPort(dao.getPort())
        .setType(dao.getType())
        .setLatestTestTime(TimeUtils.format(dao.getLatestTestTime()))
        .setCreatedAt(TimeUtils.format(dao.getCreatedAt()))
        .setUpdatedAt(TimeUtils.format(dao.getUpdatedAt()));
  }

  @Override
  public DockerEndpointDao to(DockerEndpoint dockerEndpoint) {
    return null;
  }
}
