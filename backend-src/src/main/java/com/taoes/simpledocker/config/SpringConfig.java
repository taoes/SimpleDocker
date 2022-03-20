package com.taoes.simpledocker.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:49 下午
 */
@Component
public class SpringConfig {

    @Bean
    public FilterRegistrationBean corsFilter(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource configurationSource = new UrlBasedCorsConfigurationSource();
        configurationSource.registerCorsConfiguration("/**",corsConfiguration);

        FilterRegistrationBean bean = new FilterRegistrationBean<>(new CorsFilter(configurationSource));
        bean.setOrder(0);
        return bean;
    }

    @Bean
    public ObjectMapper objectMapper(){
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
        return mapper;
    }
}
