package com.taoes.simpledocker.ws.callback;

import com.github.dockerjava.api.model.Frame;

import java.io.Closeable;
import java.io.IOException;
import javax.websocket.Session;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ContainerLogResultCallback extends AbstractResultCallback<Frame> {


    public ContainerLogResultCallback(Session session) {
        super("容器日志", session);
    }


    @SneakyThrows
    @Override
    public void onStart(Closeable closeable) {
    }

    @SneakyThrows
    @Override
    public void onNext(Frame object) {
        final byte[] payload = object.getPayload();
        sendMessage(new String(payload) + "\r\n");

    }

    @Override
    @SneakyThrows
    public void onError(Throwable throwable) {
        sendMessage("\u001B[31m 出现异常:" + throwable.getMessage() + "\u001B[0m \n");
        this.close();
    }

    @Override
    @SneakyThrows
    public void onComplete() {
        sendMessage("\u001B[31m 容器日志服务已关闭，如需再次进入请尝试刷新或者重新进入后尝试  \u001B[0m");
        this.close();
    }
}
