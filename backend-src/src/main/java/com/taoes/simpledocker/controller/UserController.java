package com.taoes.simpledocker.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.baomidou.mybatisplus.extension.api.R;
import com.taoes.simpledocker.controller.auth.UserCreateRequest;
import com.taoes.simpledocker.controller.auth.UserResetRequest;
import com.taoes.simpledocker.controller.request.user.UserAuthRoleRequest;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.model.User;
import com.taoes.simpledocker.service.UserService;
import com.taoes.simpledocker.utils.JsonUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@Api(tags = "用户管理")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @ApiOperation("用户列表")
    @GetMapping
    @SaCheckPermission(value = "user:query", orRole = Role.ADMIN_ROLE_NAME)
    public ResponseModel<List<User>> list() {
        final List<User> list = userService.list();
        return ResponseModel.ok(list);
    }

    @ApiOperation("创建用户")
    @SaCheckPermission(value = "user:add", orRole = Role.ADMIN_ROLE_NAME)
    @PostMapping
    public ResponseModel<Boolean> create(@RequestBody UserCreateRequest request) {
        User user = new User();
        user.setAccount(request.getAccount())
                .setName(request.getName())
                .setRoleIds(JsonUtils.toJsonString(request.getRoleIds()));
        userService.create(user);
        return ResponseModel.ok(true);
    }

    @ApiOperation("删除用户")
    @SaCheckPermission(value = "user:delete", orRole = Role.ADMIN_ROLE_NAME)
    @DeleteMapping("/{userId}")
    public ResponseModel<Boolean> delete(@PathVariable Long userId) {
        userService.delete(userId);
        return ResponseModel.ok(Boolean.TRUE);
    }


    @ApiOperation("配置用户角色")
    @SaCheckPermission(value = "user:authRole", orRole = Role.ADMIN_ROLE_NAME)
    @PostMapping("auth_role")
    public ResponseModel<Boolean> authRole(@Validated @RequestBody UserAuthRoleRequest request) {
        userService.authRole(request.getUserId(), request.getRoleIds());
        return ResponseModel.ok(true);
    }


}
