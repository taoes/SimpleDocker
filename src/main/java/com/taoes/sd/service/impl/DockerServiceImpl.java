package com.taoes.sd.service.impl;

import com.github.dockerjava.api.command.PullImageResultCallback;
import com.github.dockerjava.api.model.Info;
import com.github.dockerjava.api.model.ServiceSpec;
import com.github.dockerjava.api.model.Version;
import com.github.dockerjava.core.command.PushImageResultCallback;
import com.taoes.sd.service.AbstractDockerService;
import com.taoes.sd.service.DockerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class DockerServiceImpl extends AbstractDockerService implements DockerService {

    public Info dockerInfo() {
        return getClient().infoCmd().exec();
    }


    public Version dockerVersion() {
        return getClient().versionCmd().exec();
    }

    @Override
    public void ping() {
        getClient().pingCmd().exec();
    }
}
