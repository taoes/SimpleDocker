package com.taoes.simpledocker.service;


import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.model.User;
import java.util.List;

/**
 * 用户服务
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/15 1:23 下午
 */
public interface UserService {

  /**
   * 用户查询接口
   *
   * @param username 账户民
   * @return 生成的token
   */
  User findByAccount(String username);

  /**
   * 禁用用户
   *
   * @param id 用户ID
   */
  void disabled(Long id);

  /**
   * 启用用户
   *
   * @param id 用户ID
   */
  void enabled(Long id);

  List<User> list();

  void authRole(Long userId, List<Integer> roleIds);

  List<Role> getUserRoles(Long userId);

  /**
   * 创建新用户
   *
   * @param user 用户
   */
  void create(User user);
}
