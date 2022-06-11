package com.taoes.simpledocker.config.model;

import com.taoes.simpledocker.dao.bean.UserDao;
import java.util.ArrayList;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class JwtUser implements UserDetails {

  private UserDao user;

  public JwtUser(UserDao user) {
    this.user = user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    //返回当前用户的权限
    return new ArrayList<>();
  }

  @Override
  public String getPassword() {
    return user.getPassword();
  }

  @Override
  public String getUsername() {
    return user.getUsername();
  }

  /**
   * 账户是否未过期
   **/
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  /**
   * 账户是否未锁定
   **/
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  /**
   * 密码是否未过期
   **/
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  /**
   * 账户是否激活
   **/
  @Override
  public boolean isEnabled() {
    return user != null;
  }
}