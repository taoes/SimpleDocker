package com.taoes.simpledocker.config.interceptor;

import cn.dev33.satoken.stp.StpUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 */
@Slf4j
public class UserLoginInterceptor implements HandlerInterceptor {


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("url={}", request.getRequestURL().toString());
        StpUtil.checkLogin();
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
