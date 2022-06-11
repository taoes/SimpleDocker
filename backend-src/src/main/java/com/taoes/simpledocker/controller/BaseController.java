package com.taoes.simpledocker.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public abstract class BaseController {

  public List<String> getAuthentication() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
    List<String> list = new ArrayList<>();
    for (GrantedAuthority grantedAuthority : authorities) {
      log.info("权限列表：{}", grantedAuthority.getAuthority());
      list.add(grantedAuthority.getAuthority());
    }
    return list;
  }


}
