package com.taoes.simpledocker.service.imple;

import java.util.Collections;
import java.util.List;

import com.taoes.simpledocker.converter.DockerConfigConverter;
import com.taoes.simpledocker.dao.responsity.DockerRepository;
import com.taoes.simpledocker.model.DockerConfig;
import com.taoes.simpledocker.service.DockerConfigService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Docker 服务实现
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:30 下午
 */
@Slf4j
@Service
@AllArgsConstructor
public class DockerConfigServiceImpl implements DockerConfigService {

    private final DockerRepository dockerRepository;

    private final DockerConfigConverter converter;

    @Override
    public List<DockerConfig> list() {
        return Collections.singletonList(new DockerConfig());
        //final List<DockerConfigDao> dockerConfigDaoList = dockerRepository.list();
        //return dockerConfigDaoList.stream().map(converter::from).collect(Collectors.toList());
    }

}
