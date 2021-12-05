package com.example.simpledocker.controller;

import java.util.List;

import com.example.simpledocker.config.DockerClientFactory;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.ListVolumesResponse;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.Volume;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/volume")
public class VolumeController {

    @Autowired
    private DockerClientFactory clientFactory;

    @GetMapping("/list")
    public ListVolumesResponse list() {
        var client = clientFactory.get();
        return client.listVolumesCmd().exec();
    }
}
