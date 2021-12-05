package com.example.simpledocker.controller;

import java.util.List;

import javax.ws.rs.HeaderParam;

import com.example.simpledocker.config.DockerClientFactory;
import com.example.simpledocker.controller.container.OperateContainerRequest;
import com.example.simpledocker.model.enums.ContainerOperate;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 容器相关服务
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/container")
public class ContainerController {

    @Autowired
    private DockerClientFactory clientFactory;

    @GetMapping("/list")
    public List<Container> list() {
        var client = clientFactory.get();
        return client.listContainersCmd().withShowAll(true).exec();
    }

    @PostMapping("/new")
    public void run(@RequestHeader String clientId) {

    }

    @PostMapping("/operator/{operatorName}")
    public void operateContainer(@PathVariable("operatorName") ContainerOperate operate,
        @RequestBody OperateContainerRequest request) {
        final var client = clientFactory.get();
        final String containerId = request.getContainerId();

        switch (operate) {
            case START:
                client.startContainerCmd(containerId).exec();
                break;
            case STOP:
                client.stopContainerCmd(containerId).exec();
                break;
            case PAUSE:
                client.pauseContainerCmd(containerId).exec();
                break;
            case UNPAUSE:
                client.unpauseContainerCmd(containerId).exec();
                break;
            case RESTART:
                client.restartContainerCmd(containerId).exec();
                break;
            case EXPORT_LOCAL:

            default:

        }
    }

}
