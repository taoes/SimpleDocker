package com.taoes.simpledocker.config;

import com.taoes.simpledocker.config.model.SwaggerProperties;
import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.RequestHandlerSelectors.withMethodAnnotation;

/**
 * swagger在线文档配置<br>
 * 项目启动后可通过地址：http://host:ip/swagger-ui.html 查看在线文档
 *
 * @author manwang (569258yin)
 * @date 2022/7/14 21:16
 */

@Configuration
@EnableSwagger2
public class Swagger2Configuration {


    @Bean
    public Docket system(SwaggerProperties swaggerProperties) {

        return new Docket(DocumentationType.SWAGGER_2)
                // 设定Api文档头信息，这个信息会展示在文档UI的头部位置
                .apiInfo(apiInfo(swaggerProperties))
                // 是否开启Swagger(生产环境建议关闭，避免接口暴露)
                .enable(swaggerProperties.getEnable())
                .select()
                // 添加过滤条件，谓词过滤predicate，这里是自定义注解进行过滤
                .apis(withMethodAnnotation(ApiOperation.class))
                .apis(RequestHandlerSelectors.basePackage("com.taoes.simpledocker.controller"))
                // 这里配合@ComponentScan一起使用，又再次细化了匹配规则(当然，我们也可以只选择@ComponentScan、paths()方法当中的一中)
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo(SwaggerProperties swaggerProperties) {
        SwaggerProperties.Contact contact = swaggerProperties.getContact();
        return new ApiInfoBuilder()
                .title(swaggerProperties.getTitle())
                .description(swaggerProperties.getDescription())
                .termsOfServiceUrl(swaggerProperties.getTermsOfServiceUrl())
                .contact(new Contact(contact.getName(), contact.getUrl(), contact.getEmail()))
                .version(swaggerProperties.getVersion())
                .build();
    }
}
