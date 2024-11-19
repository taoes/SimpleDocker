package com.taoes.sd.controller;

import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.command.TopContainerResponse;
import com.github.dockerjava.api.model.Container;
import com.taoes.sd.model.BaseResponse;
import com.taoes.sd.model.ListResponse;
import com.taoes.sd.service.DockerContainerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/container")
@RequiredArgsConstructor
public class ContainerController extends BaseController {

    private final DockerContainerService containerService;

    @GetMapping
    public ListResponse<Container> list() {
        var data = containerService.list();
        return ListResponse.success(data);
    }


    @GetMapping("/{containerId}")
    public BaseResponse<InspectContainerResponse> inspect(@PathVariable String containerId) {
        var data = containerService.inspect(containerId);
        return BaseResponse.success(data);
    }


    @GetMapping("/{containerId}/top")
    public BaseResponse<TopContainerResponse> top(@PathVariable String containerId) {
        var data = containerService.top(containerId);
        return BaseResponse.success(data);
    }

}
