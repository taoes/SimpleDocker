package com.taoes.simpledocker.controller;

import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.service.OperateRecordService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/monitor")
public class MonitorController {

  @Autowired
  private OperateRecordService recordService;

  @GetMapping("/container")
  public ResponseModel<List> container() {

    return null;
  }

  @GetMapping("/image")
  public ResponseModel<List> image() {
    return null;
  }
}
