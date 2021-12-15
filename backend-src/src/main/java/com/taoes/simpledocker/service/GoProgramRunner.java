package com.taoes.simpledocker.service;

import java.util.concurrent.Future;

/**
 * 程序入口
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/15 1:41 下午
 */
public interface GoProgramRunner {

    /**
     * 异步运行程序
     *  @param path
     * @param param
     * @return Future
     */
    Future<?> asyncRun(String path, String... param);
}
