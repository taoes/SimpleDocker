package com.taoes.simpledocker.config;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.exception.SaTokenException;
import com.taoes.simpledocker.model.ResponseModel;

import com.taoes.simpledocker.model.enums.ErrorCode;
import com.taoes.simpledocker.model.exception.ParamCheckException;
import javax.ws.rs.ProcessingException;

import com.taoes.simpledocker.model.enums.PermissionEnum;
import org.springframework.http.HttpEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * 统一异常处理器
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/4 11:49 下午
 */
@ControllerAdvice
public class CommandExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public HttpEntity<ResponseModel<?>> corsFilter(RuntimeException e) {
        if (e instanceof ProcessingException) {
            String msg = "Docker服务连接异常";
            return new HttpEntity<>(ResponseModel.fail(msg).setErrorCode(ErrorCode.DOCKER_ENDPOINT_CONNECT_ERROR));
        }
        return new HttpEntity<>(ResponseModel.fail(e.getMessage()).setErrorCode(ErrorCode.SYSTEM_ERROR));
    }

    @ExceptionHandler(BindException.class)
    public HttpEntity<ResponseModel<?>> handleBindException(BindException e){
        // TODO 待优化异常提示文案
        return new HttpEntity<>(ResponseModel.fail(e.getMessage()).setErrorCode(ErrorCode.PARAM_ERROR));
    }

    /**
     * 未登录异常
     */
    @ExceptionHandler(NotLoginException.class)
    public HttpEntity<ResponseModel<?>> handleNotLoginException(NotLoginException e){
        return new HttpEntity<>(ResponseModel.fail("未登录系统").setErrorCode(ErrorCode.NOT_LOGIN));
    }


    /**
     * 无权限异常
     */
    @ExceptionHandler(NotPermissionException.class)
    public HttpEntity<ResponseModel<?>> saPermissionFilter(NotPermissionException e) {
        PermissionEnum permissionEnum = PermissionEnum.getPermissionEnum(e.getPermission());
        return new HttpEntity<>(ResponseModel.fail("无" + permissionEnum.getDesc() + "权限").setErrorCode(ErrorCode.PERMISSION_NOT_FOUND));
    }

    @ExceptionHandler(ParamCheckException.class)
    public HttpEntity<ResponseModel<?>> paramCheckException(ParamCheckException e){
        return new HttpEntity<>(ResponseModel.fail(e.getMessage()).setCode(403));
    }
}
