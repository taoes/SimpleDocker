package com.taoes.simpledocker.service;

/**
 * docker 服务
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:23 下午
 */
public interface DockerClientService {
    /**
     * 登录接口
     *
     * @return 生成的token
     */
    Void ping();

    /**
     * 监控服务
     */
    void monitor();
}
