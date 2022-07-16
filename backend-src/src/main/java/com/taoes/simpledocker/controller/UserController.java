package com.taoes.simpledocker.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.taoes.simpledocker.controller.request.user.UserAuthRoleRequest;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.model.User;
import com.taoes.simpledocker.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@Api(tags = "用户管理")
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

    @ApiOperation("配置用户角色")
    @SaCheckPermission(value = "user:authRole", orRole = Role.ADMIN_ROLE_NAME)
    @PostMapping("auth_role")
    public ResponseModel<Boolean> authRole(@Validated @RequestBody UserAuthRoleRequest request) {
        userService.authRole(request.getUserId(), request.getRoleIds());
        return ResponseModel.ok(true);
    }


}
