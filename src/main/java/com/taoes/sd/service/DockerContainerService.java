package com.taoes.sd.service;

import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.command.TopContainerResponse;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.Image;

import java.util.List;

public interface DockerContainerService {

    List<Container> list();


    InspectContainerResponse inspect(String containerId);

    void remove(String containerId, Boolean foreRemove);

    void pure(Boolean foreRemove);

    /**
     * 导出
     */
    void createImg(String containerId);

    TopContainerResponse top(String containerId);

}
