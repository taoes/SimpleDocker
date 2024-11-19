package com.taoes.sd.service;

import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.Info;
import com.github.dockerjava.api.model.Version;

import java.util.List;

public interface DockerService {

    Info dockerInfo();

    Version dockerVersion();

    void ping();


}
