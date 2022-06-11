package com.taoes.simpledocker.service.auth;

import com.taoes.simpledocker.dao.bean.UserDao;
import com.taoes.simpledocker.dao.responsity.UserRepository;
import java.util.Collections;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserDetailService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    final UserDao userDao = userRepository.findByName(username).orElse(null);
    return new User(userDao.getUsername(), userDao.getPassword(), Collections.emptyList());
  }
}
