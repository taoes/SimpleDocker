package com.taoes.sd.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.model.Image;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface DockerImageService {

    List<Image> list();


    InspectImageResponse inspect(String imageId);

    void remove(String imageId, Boolean foreRemove);

    void pure(Boolean foreRemove);

    /**
     * 导出
     */
    void export(String imageId);

    void pull(SseEmitter emitter);
}
