package com.taoes.simpledocker.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.sun.xml.internal.ws.server.MonitorRootService;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.service.OperateRecordService;
import io.swagger.annotations.Api;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "Docker监控")
@RestController
@RequestMapping("/api/monitor")
@RequiredArgsConstructor
public class MonitorController {

    private final OperateRecordService recordService;


    @PostMapping("/container")
    public ResponseModel<List> container() {

        return null;
    }

    @GetMapping("/image")
    public ResponseModel<List> image() {
        return null;
    }
}
