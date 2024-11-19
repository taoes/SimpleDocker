package com.taoes.sd.controller;

import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.model.Image;
import com.taoes.sd.model.BaseResponse;
import com.taoes.sd.model.ListResponse;
import com.taoes.sd.service.DockerImageService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/api/image")
@AllArgsConstructor
public class ImageController extends BaseController {

    private final DockerImageService imageService;

    @GetMapping
    public ListResponse<Image> list() {
        List<Image> images = imageService.list();
        return ListResponse.success(images);
    }


    @PostMapping
    public SseEmitter createPull() {
        imageService.pull()
         new SseEmitter(Long.MAX_VALUE);
    }

    @GetMapping("/{imageId}")
    public BaseResponse<InspectImageResponse> inspectImage(@PathVariable String imageId) {
        var detail = imageService.inspect(imageId);
        return BaseResponse.success(detail);
    }

    @DeleteMapping("/{imageId}")
    public BaseResponse<?> deleteImage(@PathVariable String imageId, @RequestParam(defaultValue = "false") Boolean foreRemove) {
        imageService.remove(imageId, foreRemove);
        return BaseResponse.success();
    }


    @DeleteMapping
    public BaseResponse<?> pureImage(@RequestParam(defaultValue = "false") Boolean foreRemove) {
        imageService.pure(foreRemove);
        return BaseResponse.success();
    }
}
