package com.taoes.sd.controller;

import com.github.dockerjava.api.model.Info;
import com.github.dockerjava.api.model.Version;
import com.taoes.sd.model.BaseResponse;
import com.taoes.sd.model.ListResponse;
import com.taoes.sd.service.DockerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/docker")
@RequiredArgsConstructor
public class DockerController extends BaseController {


    private final DockerService dockerService;


    @GetMapping("/client")
    public ListResponse<Objects> dockerClient() {
        return ListResponse.success(Collections.emptyList());
    }

    @GetMapping("/info")
    public BaseResponse<Info> dockerInfo() {
        return BaseResponse.success(dockerService.dockerInfo());
    }

    @GetMapping("/version")
    public BaseResponse<Version> dockerVersion() {
        return BaseResponse.success(dockerService.dockerVersion());
    }
}
