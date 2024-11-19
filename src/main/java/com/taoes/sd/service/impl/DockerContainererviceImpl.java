package com.taoes.sd.service.impl;

import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.command.TopContainerResponse;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.PruneType;
import com.taoes.sd.service.AbstractDockerService;
import com.taoes.sd.service.DockerContainerService;
import com.taoes.sd.service.DockerImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class DockerContainererviceImpl extends AbstractDockerService implements DockerContainerService {


    @Override
    public List<Container> list() {
        return getClient().listContainersCmd().withShowAll(true).exec();
    }

    @Override
    public InspectContainerResponse inspect(String containerId) {
        return getClient().inspectContainerCmd(containerId).exec();
    }

    @Override
    public void remove(String containerId, Boolean foreRemove) {

    }

    @Override
    public void pure(Boolean foreRemove) {

    }

    @Override
    public void createImg(String containerId) {

    }

    @Override
    public TopContainerResponse top(String containerId) {
        return getClient().topContainerCmd(containerId).withPsArgs("-e -L").exec();
    }
}
