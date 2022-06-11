package com.taoes.simpledocker.aop.annotation;


import com.taoes.simpledocker.model.enums.OperatorResource;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 操作记录器
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface OperateRecorder {

   OperatorResource type() default OperatorResource.IMAGE_v1;
}
