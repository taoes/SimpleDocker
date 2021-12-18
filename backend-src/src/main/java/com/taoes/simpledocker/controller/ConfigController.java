package com.taoes.simpledocker.controller;

import java.util.List;

import com.taoes.simpledocker.controller.client.DockerClientConfig;
import com.taoes.simpledocker.model.ResponseModel;
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

    @PostMapping("/client")
    public ResponseModel<List<DockerClientConfig>> clientList() {
        return new ResponseModel<>();
    }
}
