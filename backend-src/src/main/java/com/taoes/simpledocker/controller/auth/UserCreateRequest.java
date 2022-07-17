package com.taoes.simpledocker.controller.auth;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class UserCreateRequest {

  private String account;

  private String name;

  private List<String> roleIds;

}
