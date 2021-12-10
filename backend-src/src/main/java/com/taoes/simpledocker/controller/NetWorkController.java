package com.taoes.simpledocker.controller;

import java.util.List;

import com.taoes.simpledocker.config.DockerClientFactory;
import com.github.dockerjava.api.model.Network;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 网络控制器接口
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/network")
public class NetWorkController {

    @Autowired
    private DockerClientFactory clientFactory;

    @GetMapping("/list")
    public List<Network> list() {
        var client = clientFactory.get();
        return client.listNetworksCmd().exec();
    }
}
