package com.taoes.simpledocker.service.docker.monitor;

import java.io.Closeable;
import java.io.IOException;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Event;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Docker 服务监控
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/22 1:28 下午
 */
@Slf4j
@AllArgsConstructor
public class DockerMonitorCallback implements ResultCallback<Event> {

    private final DockerClient client;

    @Override
    public void onStart(Closeable closeable) {
        log.info("开始监控client:{}的变动信息", client);
    }

    @Override
    public void onNext(Event object) {

    }

    @Override
    public void onError(Throwable throwable) {
        // TODO 10S 之后重启监控
        log.info("监控client:{}出现错误，10S之后重启监控", client);
        log.info("异常信息，", throwable);
    }

    @Override
    public void onComplete() {

    }

    @Override
    public void close() throws IOException {
        // TODO 10S 之后重启监控
        log.info("监控client:{}出现被关闭，10S之后监控", client);
    }
}


