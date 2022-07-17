package com.taoes.simpledocker.converter;

import com.taoes.simpledocker.dao.bean.UserDao;
import com.taoes.simpledocker.model.User;
import com.taoes.simpledocker.utils.TimeUtils;
import org.springframework.stereotype.Component;

/**
 * DockerConfig 的转换器
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/22 1:41 下午
 */

@Component
public class UserConverter extends AbstractConverter<UserDao, User> {

  @Override
  public User from(UserDao userDao) {
    return new User()
        .setId(userDao.getId())
        .setAccount(userDao.getAccount())
        .setCreatedAt(TimeUtils.format(userDao.getCreatedAt()))
        .setUpdatedAt(TimeUtils.format(userDao.getUpdatedAt()));
  }

  @Override
  public UserDao to(User user) {
    return new UserDao()
        .setAccount(user.getAccount())
        .setName(user.getName())
        .setPassword(user.getAccount())
        .setRoleIds(user.getRoleIds())
        .setSaltValue(user.getAccount());
  }
}
