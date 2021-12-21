package com.taoes.simpledocker.service.imple;

import com.github.dockerjava.api.DockerClient;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.service.DockerClientService;
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
public class DockerClientServiceImpl implements DockerClientService {

    private final DockerClientFactory factory;

    @Override
    public Void ping() {
        final DockerClient client = factory.get();
        return client.pingCmd().exec();
    }

}
