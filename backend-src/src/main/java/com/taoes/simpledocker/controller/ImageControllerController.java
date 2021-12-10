package com.taoes.simpledocker.controller;

import java.util.List;

import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.controller.image.PushImageRequest;
import com.taoes.simpledocker.controller.image.RemoveImageRequest;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/images")
public class ImageControllerController {

    @Autowired
    private DockerClientFactory clientFactory;

    @GetMapping("/list")
    public List<Image> list() {
        final DockerClient dockerClient = clientFactory.get();
        return dockerClient.listImagesCmd().withShowAll(true).exec();
    }

    @PutMapping
    public Object pull(@RequestParam String imageTag) {
        final DockerClient dockerClient = clientFactory.get();
        return dockerClient.pullImageCmd(imageTag).exec(null);
    }

    @PostMapping
    public Object push(@RequestBody PushImageRequest request) {
        final DockerClient dockerClient = clientFactory.get();
        return dockerClient.pushImageCmd(request.getImageId()).exec(null);
    }

    @DeleteMapping
    public String remove(@RequestBody RemoveImageRequest request) {
        final DockerClient dockerClient = clientFactory.get();
        dockerClient.removeImageCmd(request.getImageId()).withForce(request.isForce()).exec();
        return "OK";
    }
}
