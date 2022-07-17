package com.taoes.simpledocker.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.taoes.simpledocker.controller.client.DockerClientConfig;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.service.ConfigService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Map;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@Api(tags = "系统配置")
@RestController
@RequestMapping("/api/config")
public class ConfigController {

    @Autowired
    private ConfigService configService;


    @PostMapping("/client")
    public ResponseModel<List<DockerClientConfig>> clientList() {
        return new ResponseModel<>();
    }

    @SaCheckPermission(value = "config:system", orRole = Role.ADMIN_ROLE_NAME)
    @ApiOperation("获取系统配置")
    @GetMapping("/system")
    public ResponseModel<Map<String, String>> getConfigByKeys() {
        Map<String,String> config = configService.findConfigByKeys(new HashSet<>());
        return ResponseModel.ok(config);
    }
}
