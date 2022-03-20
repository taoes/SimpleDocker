package com.taoes.simpledocker.controller;

import com.taoes.simpledocker.controller.auth.UserLoginRequest;
import com.taoes.simpledocker.controller.auth.UserResetRequest;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@RestController("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseModel<String> login(@RequestBody UserLoginRequest loginRequest) {
        final String username = loginRequest.getUsername();
        final String password = loginRequest.getPassword();

        String token = this.authService.login(username, password);
        return ResponseModel.ok(token);
    }

    /**
     * 重置密码
     */
    @PostMapping("/reset")
    public ResponseModel<Boolean> resetPassword(@RequestBody UserResetRequest request) {
        request.checkParam();
        authService.reset(request.getUsername(), request.getPassword(), request.getNewPassword());
        return ResponseModel.ok(Boolean.TRUE);
    }

}
