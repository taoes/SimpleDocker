package com.taoes.simpledocker.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Network;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.Role;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 网络控制器接口
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@Api(tags = "Docker网络管理")
@RestController
@RequestMapping("/api/network")
@RequiredArgsConstructor
public class NetWorkController {

    private final DockerClientFactory clientFactory;

    @ApiOperation("网络列表")
    @SaCheckPermission(value = "network:query", orRole = Role.ADMIN_ROLE_NAME)
    @GetMapping("/list")
    public ResponseModel<List<Network>> list() {
        DockerClient client = clientFactory.get();
        final List<Network> exec = client.listNetworksCmd().exec();
        return ResponseModel.ok(exec);
    }
}
