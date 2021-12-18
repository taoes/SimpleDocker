package com.taoes.simpledocker.controller;

import com.taoes.simpledocker.config.DockerClientFactory;
import com.github.dockerjava.api.command.ListVolumesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
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
