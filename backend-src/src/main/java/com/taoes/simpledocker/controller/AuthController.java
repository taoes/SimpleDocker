package com.taoes.simpledocker.controller;

import com.taoes.simpledocker.controller.auth.UserLoginRequest;
import com.taoes.simpledocker.controller.auth.UserResetRequest;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.service.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@Api(tags = "认证")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @ApiOperation("登录")
    @PostMapping("/login")
    public ResponseModel<String> login(@RequestBody UserLoginRequest loginRequest) {
        final String username = loginRequest.getUsername();
        final String password = loginRequest.getPassword();

        String token = this.authService.login(username, password);
        return ResponseModel.ok(token);
    }

    @ApiOperation("登出")
    @PostMapping("/logout")
    public ResponseModel<Boolean> logout() {
        this.authService.logout();
        return ResponseModel.ok(Boolean.TRUE);
    }

    /**
     * 重置密码
     */
    @ApiOperation("重置密码")
    @PostMapping("/reset")
    public ResponseModel<Boolean> resetPassword(@RequestBody UserResetRequest request) {
        request.checkParam();
        authService.reset(request.getUsername(), request.getPassword(), request.getNewPassword());
        return ResponseModel.ok(Boolean.TRUE);
    }

}
