package com.taoes.simpledocker.config;

import com.taoes.simpledocker.model.ResponseModel;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:49 下午
 */
@ControllerAdvice
public class CommandExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public HttpEntity<ResponseModel> corsFilter(RuntimeException e){
        return new HttpEntity<>(new ResponseModel<>());
    }
}
