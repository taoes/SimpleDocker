package com.taoes.simpledocker.service;

import java.util.List;

import com.taoes.simpledocker.model.Docker;

/**
 * docker 服务
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/15 1:23 下午
 */
public interface DockerService {
    /**
     * 登录接口
     *
     * @return 生成的token
     */
    List<Docker> list();
}
