package com.taoes.simpledocker.controller;

import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.User;
import com.taoes.simpledocker.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping
  public ResponseModel<List<User>> list() {
    final List<User> list = userService.list();
    return ResponseModel.ok(list);
  }

}
