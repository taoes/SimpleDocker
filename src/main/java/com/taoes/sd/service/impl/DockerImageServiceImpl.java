package com.taoes.sd.service.impl;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.command.PullImageResultCallback;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.PruneType;
import com.taoes.sd.service.AbstractDockerService;
import com.taoes.sd.service.DockerImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class DockerImageServiceImpl extends AbstractDockerService implements DockerImageService {


    @Override
    public List<Image> list() {
        return getClient().listImagesCmd().withShowAll(true).exec();
    }


    @Override
    public InspectImageResponse inspect(String imageId) {
        return getClient().inspectImageCmd(imageId).withImageId(imageId).exec();
    }

    @Override
    public void remove(String imageId, Boolean foreRemove) {
        getClient().removeImageCmd(imageId).withForce(Objects.equals(foreRemove, Boolean.TRUE)).exec();
    }

    @Override
    public void pure(Boolean foreRemove) {
        getClient().pruneCmd(PruneType.IMAGES).exec();
    }

    @Override
    public void export(String imageId) {
    }

    @Override
    public void pull(SseEmitter emitter) {
        getClient().pullImageCmd().withRepository().exec(new PullImageResultCallback())
    }
}
