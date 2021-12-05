package com.example.simpledocker.controller;

import java.util.List;

import com.example.simpledocker.controller.client.DockerClientConfig;
import com.example.simpledocker.model.ResponseModel;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/config")
public class ConfigController {

    @PostMapping("/client")
    public ResponseModel<List<DockerClientConfig>> clientList() {
        return new ResponseModel<>();
    }
}
