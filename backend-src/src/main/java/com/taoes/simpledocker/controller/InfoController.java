package com.taoes.simpledocker.controller;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Info;
import com.github.dockerjava.api.model.Version;
import com.taoes.simpledocker.config.DockerClientFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/info")
public class InfoController {

    @Autowired
    private DockerClientFactory clientFactory;

    @GetMapping
    public Map<String, Object> info() {
        final DockerClient client = clientFactory.get();
        final Info info = client.infoCmd().exec();
        final Version version = client.versionCmd().exec();

        Map<String,Object> result = new HashMap<>();
        result.put("info", info);
        result.put("version", version);
        return result;
    }
}
