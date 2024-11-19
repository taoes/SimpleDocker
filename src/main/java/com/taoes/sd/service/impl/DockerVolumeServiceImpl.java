package com.taoes.sd.service.impl;

import com.github.dockerjava.api.command.CreateVolumeResponse;
import com.github.dockerjava.api.model.Volume;
import com.taoes.sd.service.AbstractDockerService;
import com.taoes.sd.service.DockerVolumeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class DockerVolumeServiceImpl extends AbstractDockerService implements DockerVolumeService {
    @Override
    public CreateVolumeResponse create() {
        return null;
    }

    @Override
    public List<Volume> list() {
        return null;
    }

    @Override
    public Volume inspect(String imageId) {
        return null;
    }

    @Override
    public void remove(String volumeId, Boolean foreRemove) {

    }

    @Override
    public void connect(String networkId, String containerId) {

    }

    @Override
    public void disconnect(String networkId, String containerId, boolean force) {

    }
}
