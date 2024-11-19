package com.taoes.sd.service;

import com.github.dockerjava.api.command.CreateNetworkResponse;
import com.github.dockerjava.api.command.CreateVolumeResponse;
import com.github.dockerjava.api.model.Network;
import com.github.dockerjava.api.model.Volume;

import java.util.List;

public interface DockerVolumeService {


    CreateVolumeResponse create();

    List<Volume> list();


    Volume inspect(String imageId);

    void remove(String volumeId, Boolean foreRemove);

    void connect(String networkId,String containerId);

    void disconnect(String networkId, String containerId,boolean force);



}
