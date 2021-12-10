package com.taoes.simpledocker.controller;

import java.util.List;
import java.util.Map;

import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.controller.container.OperateContainerRequest;
import com.taoes.simpledocker.model.enums.ContainerOperate;
import com.github.dockerjava.api.model.Container;
import com.taoes.simpledocker.utils.DataConverterUtils;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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

    @PostMapping("/{containerId}/{operate}")
    public void operateContainer(
        @PathVariable ContainerOperate operate,
        @PathVariable OperateContainerRequest request) {
        final var client = clientFactory.get();
        final var containerId = request.getContainerId();
        final var properties = request.getProperties();

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
            case REMOVE:
                final String force = properties.getOrDefault("force", "false");
                final String removeVolume = properties.getOrDefault("removeVolume", "false");
                client.removeContainerCmd(containerId)
                    .withForce(DataConverterUtils.parse(force, false))
                    .withRemoveVolumes(DataConverterUtils.parse(removeVolume, false))
                    .exec();
            case EXPORT_LOCAL:

            default:

        }
    }

}
