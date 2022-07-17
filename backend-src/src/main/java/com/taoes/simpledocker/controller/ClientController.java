package com.taoes.simpledocker.controller;

import com.taoes.simpledocker.model.DockerEndpoint;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.service.DockerEndpointService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@Api(tags = "Docker客户端")
@RestController
@RequestMapping("/api/endpoint")
@RequiredArgsConstructor
public class ClientController {

   private final DockerEndpointService dockerEndpointService;

    @ApiOperation("Docker端列表")
    @GetMapping
    public ResponseModel<List<DockerEndpoint>> list() {
        return ResponseModel.ok(dockerEndpointService.list());
    }
}
