package com.example.simpledocker.controller;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.HeaderParam;

import com.example.simpledocker.config.DockerClientFactory;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.ListVolumesResponse;
import com.github.dockerjava.api.model.Info;
import com.github.dockerjava.api.model.Version;
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
@RequestMapping("/api/info")
public class InfoController {

    @Autowired
    private DockerClientFactory clientFactory;

    @GetMapping
    public Map<String, Object> info() {
        final var client = clientFactory.get();
        final var info = client.infoCmd().exec();
        final var version = client.versionCmd().exec();

        var result = new HashMap<String, Object>();
        result.put("info", info);
        result.put("version", version);
        return result;
    }
}
