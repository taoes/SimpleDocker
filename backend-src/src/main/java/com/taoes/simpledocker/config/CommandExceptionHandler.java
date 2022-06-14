package com.taoes.simpledocker.config;

import com.taoes.simpledocker.model.ResponseModel;
import javax.ws.rs.ProcessingException;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * 统一异常处理器
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:49 下午
 */
@ControllerAdvice
public class CommandExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public HttpEntity<ResponseModel<?>> corsFilter(RuntimeException e){
        if (e instanceof ProcessingException){
            String msg = "Docker服务连接异常";
            return new HttpEntity<>(ResponseModel.fail(msg).setCode(400));
        }
        return new HttpEntity<>(ResponseModel.fail(e.getMessage()).setCode(400));
    }
}
