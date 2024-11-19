package com.taoes.sd.service;

import com.github.dockerjava.api.command.CreateNetworkResponse;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.Network;

import java.util.List;

public interface DockerNetworkService {


    CreateNetworkResponse create();

    List<Network> list();


    Network inspect(String imageId);

    void remove(String networkId, Boolean foreRemove);

    void connect(String networkId,String containerId);

    void disconnect(String networkId, String containerId,boolean force);



}
