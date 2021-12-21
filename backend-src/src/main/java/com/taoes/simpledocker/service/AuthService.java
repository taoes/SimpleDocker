package com.taoes.simpledocker.service;

/**
 * 授权服务
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:23 下午
 */
public interface AuthService {
    /**
     * 登录接口
     *
     * @param username 账户民
     * @param password 密码
     * @return 生成的token
     */
    String login(String username, String password);

    /**
     * 重置密码
     *
     * @param username    用户名
     * @param password    原密码
     * @param newPassword 新密码
     */
    void reset(String username, String password, String newPassword);
}
