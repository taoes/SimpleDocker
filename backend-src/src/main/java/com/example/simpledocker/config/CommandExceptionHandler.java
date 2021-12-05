package com.example.simpledocker.config;

import com.example.simpledocker.model.ResponseModel;
import org.apache.coyote.Response;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/4 11:49 下午
 */
@ControllerAdvice
public class CommandExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public HttpEntity<ResponseModel> corsFilter(RuntimeException e){
        return new HttpEntity<>(new ResponseModel<>());
    }
}
