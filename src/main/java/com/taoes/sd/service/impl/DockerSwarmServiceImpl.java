package com.taoes.sd.service.impl;

import com.github.dockerjava.api.model.SwarmSpec;
import com.taoes.sd.service.AbstractDockerService;
import com.taoes.sd.service.DockerSwarmService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DockerSwarmServiceImpl  extends AbstractDockerService implements DockerSwarmService {
    public void init(){

    }
}
