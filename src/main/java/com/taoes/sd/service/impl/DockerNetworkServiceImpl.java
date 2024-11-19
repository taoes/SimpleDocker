package com.taoes.sd.service.impl;

import com.github.dockerjava.api.command.CreateNetworkResponse;
import com.github.dockerjava.api.exception.DockerException;
import com.github.dockerjava.api.model.Network;
import com.taoes.sd.service.AbstractDockerService;
import com.taoes.sd.service.DockerNetworkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class DockerNetworkServiceImpl extends AbstractDockerService implements DockerNetworkService {

    @Override
    public CreateNetworkResponse create() {
        getClient().createNetworkCmd().exec();
        return null;
    }

    @Override
    public List<Network> list() {
        return getClient().listNetworksCmd().exec();
    }

    @Override
    public Network inspect(String networkId) {
        return getClient().inspectNetworkCmd().withNetworkId(networkId).exec();
    }

    @Override
    public void remove(String networkId, Boolean foreRemove) {
        getClient().removeNetworkCmd(networkId).exec();
    }

    @Override
    public void connect(String networkId, String containerId) {
        getClient().connectToNetworkCmd().withNetworkId(networkId).withContainerId(containerId).exec();
    }

    @Override
    public void disconnect(String networkId, String containerId, boolean force) {
        getClient().disconnectFromNetworkCmd().withContainerId(networkId).withContainerId(containerId).withForce(force).exec();

    }


}
