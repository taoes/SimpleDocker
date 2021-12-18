package com.taoes.simpledocker.service;

import org.apache.catalina.User;

/**
 * 用户服务
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:23 下午
 */
public interface UserService {
    /**
     * 用户查询接口
     *
     * @param username 账户民
     * @return 生成的token
     */
    User findByName(String username);

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
}
