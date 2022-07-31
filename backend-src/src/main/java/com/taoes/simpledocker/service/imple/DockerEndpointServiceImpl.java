package com.taoes.simpledocker.service.imple;

import com.github.dockerjava.api.DockerClient;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.converter.DockerEndpointConverter;
import com.taoes.simpledocker.dao.bean.DockerEndpointDao;
import com.taoes.simpledocker.dao.responsity.EndpointRepository;
import com.taoes.simpledocker.model.DockerEndpoint;
import com.taoes.simpledocker.service.DockerEndpointService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/21 8:40 下午
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DockerEndpointServiceImpl implements DockerEndpointService {



  private final EndpointRepository endpointRepository;

  private final DockerEndpointConverter endpointConverter;


  @Override
  public void monitor() {
  }


  @Override
  public List<DockerEndpoint> list() {
    final List<DockerEndpointDao> list = endpointRepository.list();
    return list.stream().map(endpointConverter::from).collect(Collectors.toList());
  }
}
