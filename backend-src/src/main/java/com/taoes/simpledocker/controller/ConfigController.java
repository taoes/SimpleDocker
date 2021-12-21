package com.taoes.simpledocker.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Map;

import com.taoes.simpledocker.controller.client.DockerClientConfig;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.service.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/config")
public class ConfigController {

    @Autowired
    private ConfigService configService;

    @PostMapping("/client")
    public ResponseModel<List<DockerClientConfig>> clientList() {
        return new ResponseModel<>();
    }

    @GetMapping("/system")
    public ResponseModel<Map<String, String>> getConfigByKeys() {
        var config = configService.findConfigByKeys(new HashSet<>());
        return ResponseModel.ok(config);
    }
}
