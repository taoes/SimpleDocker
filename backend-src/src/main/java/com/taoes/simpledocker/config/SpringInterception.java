package com.taoes.simpledocker.config;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:49 下午
 */

@Component
public class SpringInterception implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //注册TestInterceptor拦截器
        InterceptorRegistration registration = registry.addInterceptor(new DockerClientInterception());
        registration.addPathPatterns("/**");
        registration.excludePathPatterns(
            "/**/*.html",
            "/**/*.js",
            "/**/*.css",
            "/**/*.woff",
            "/**/*.ttf"
        );
    }
}
