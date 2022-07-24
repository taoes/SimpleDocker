package com.taoes.simpledocker.ws.callback;

import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;

import java.io.Closeable;
import java.io.IOException;
import java.nio.ByteBuffer;
import javax.websocket.Session;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractResultCallback<T> extends ResultCallback.Adapter<T> {


    private final Session session;

    private final String name;

    private Closeable closeable;


    public AbstractResultCallback(String name, Session session) {
        this.name = name;
        this.session = session;
    }

    /**
     * 发送消息
     */
    public void sendMessage(String message) {
        try {
            log.debug("接收到消息:{}",message);
            this.session.getBasicRemote().sendText(message);
        } catch (Exception e) {
            log.error("发送消息出错：{}", e.getMessage());
        }
    }

    public void sendMessage(ByteBuffer message) {
        try {
            log.debug("接收到消息:{}",message.toString());
            this.session.getBasicRemote().sendBinary(message);
        } catch (Exception e) {
            log.error("发送消息出错：{}", e.getMessage());
        }
    }


    @SneakyThrows
    @Override
    public void onStart(Closeable closeable) {
        log.info("WebSocket:{}服务连接成功,id={}", name, session.getId());
        this.closeable = closeable;
    }

    @SneakyThrows
    @Override
    public void close() {
        if (closeable != null) {
            this.closeable.close();
        }
        if (this.session != null && this.session.isOpen()) {
            this.session.close();
        }
    }
}
