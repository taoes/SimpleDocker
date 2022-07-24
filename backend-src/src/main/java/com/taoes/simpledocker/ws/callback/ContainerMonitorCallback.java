package com.taoes.simpledocker.ws.callback;

import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.api.model.Statistics;
import com.taoes.simpledocker.utils.JsonUtils;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import netscape.javascript.JSObject;

import javax.websocket.Session;
import java.io.Closeable;
import java.io.IOException;
import java.nio.ByteBuffer;

/**
 * 容器状态监控数据callback
 */
@Slf4j
public class ContainerMonitorCallback extends AbstractResultCallback<Statistics> {


    public ContainerMonitorCallback(Session session) {
        super("容器状态", session);
    }


    @SneakyThrows
    @Override
    public void onNext(Statistics statistics) {
        log.debug("接收到消息:{}", JsonUtils.toJsonString(statistics));
        sendMessage(JsonUtils.toJsonString(statistics));
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
        sendMessage("\u001B[31m 服务已关闭，如需再次进入请尝试刷新或者重新进入  \u001B[0m");
        this.close();
    }

}
