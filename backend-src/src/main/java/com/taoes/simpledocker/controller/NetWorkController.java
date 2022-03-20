package com.taoes.simpledocker.controller;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Network;
import com.taoes.simpledocker.config.DockerClientFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 网络控制器接口
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/network")
public class NetWorkController {

    @Autowired
    private DockerClientFactory clientFactory;

    @GetMapping("/list")
    public List<Network> list() {
        DockerClient client = clientFactory.get();
        return client.listNetworksCmd().exec();
    }
}
