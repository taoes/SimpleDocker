package com.taoes.simpledocker.controller;

import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.command.TopContainerResponse;
import com.github.dockerjava.api.model.Container;
import com.taoes.simpledocker.controller.container.OperateContainerRequest;
import com.taoes.simpledocker.controller.container.RunNewContainerRequest;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.enums.ContainerOperate;
import com.taoes.simpledocker.service.ContainerService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 容器相关服务
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@Slf4j
@RestController
@RequestMapping("/api/container")
@AllArgsConstructor
public class ContainerController {

    private ContainerService service;

    @GetMapping
    public List<Container> list() {
        return service.list(true);
    }

    @GetMapping("/{containerId}")
    public InspectContainerResponse inspect(@PathVariable String containerId) {
        return service.inspect(containerId);
    }

    @PostMapping("/new")
    public CreateContainerResponse run(@RequestBody RunNewContainerRequest request) {
        return service.run(request);
    }

    @GetMapping("/{containerId}/top")
    public TopContainerResponse top(@PathVariable String containerId, String psArgs) {
        return service.top(containerId, psArgs);
    }

    @PostMapping("/operator/{operate}")
    public ResponseModel<Boolean> operateContainer(
            @PathVariable ContainerOperate operate,
            @RequestBody OperateContainerRequest request) {

        final String containerId = request.getContainerId();
        final Map<String, String> properties = request.findProperties();

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
