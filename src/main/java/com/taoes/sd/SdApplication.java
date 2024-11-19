package com.taoes.sd;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.taoes.sd.repository.sqlite.mapper")
@SpringBootApplication
public class SdApplication {

	public static void main(String[] args) {
		SpringApplication.run(SdApplication.class, args);
	}

}
