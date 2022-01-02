package com.taoes.simpledocker.controller;

import java.util.List;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.model.Image;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.controller.image.PushImageRequest;
import com.taoes.simpledocker.controller.image.RemoveImageRequest;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final DockerClientFactory clientFactory;

    private final ImageService imageService;

    @GetMapping("/list")
    public List<Image> list() {
        final DockerClient dockerClient = clientFactory.get();
        return dockerClient.listImagesCmd().withShowAll(true).exec();
    }

    @GetMapping("/{imageId}/inspect")
    public InspectImageResponse findById(@PathVariable String imageId) {
        return imageService.inspect(imageId);
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

    @DeleteMapping("/{imageId}")
    public ResponseModel<String> remove(@PathVariable String imageId, @RequestBody RemoveImageRequest request) {
        imageService.remove(imageId,request.getForce());
        return ResponseModel.ok("OK");
    }
}
