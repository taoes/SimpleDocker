package com.taoes.simpledocker.controller;

import java.util.List;

import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.controller.container.OperateContainerRequest;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.enums.ContainerOperate;
import com.github.dockerjava.api.model.Container;
import com.taoes.simpledocker.service.ContainerService;
import com.taoes.simpledocker.utils.BooleanUtils;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class ContainerController {

    private ContainerService service;

    @GetMapping("/list")
    public List<Container> list() {
        return service.list(true);
    }

    @PostMapping("/new")
    public void run(@RequestHeader String clientId) {

    }

    @PostMapping("/operator/{operate}")
    public ResponseModel<Boolean> operateContainer(
        @PathVariable ContainerOperate operate,
        @RequestBody OperateContainerRequest request) {

        final var containerId = request.getContainerId();
        final var properties = request.findProperties();

        try {
            switch (operate) {
                case START:
                    service.start(containerId);
                    break;
                case STOP:
                    service.stop(containerId);
                    break;
                case PAUSE:
                    service.pause(containerId);
                    break;
                case UNPAUSE:
                    service.unpause(containerId);
                    break;
                case REMOVE:
                    service.remove(containerId, properties);
                    break;
                case EXPORT_LOCAL:
                default:
            }
        } catch (Exception e) {
            return ResponseModel.fail(e.getMessage());
        }
        return ResponseModel.ok(Boolean.TRUE);
    }

}
