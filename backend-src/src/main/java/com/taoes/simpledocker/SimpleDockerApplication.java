package com.taoes.simpledocker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
public class SimpleDockerApplication {

  /**
   * 梦开始的地方
   */
  public static void main(String[] args) {
    SpringApplication.run(SimpleDockerApplication.class, args);
  }
}
