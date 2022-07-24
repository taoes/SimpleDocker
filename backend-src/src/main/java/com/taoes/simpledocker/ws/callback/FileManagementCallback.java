package com.taoes.simpledocker.ws.callback;

import com.github.dockerjava.api.model.Frame;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import javax.websocket.Session;
import java.io.Closeable;
import java.nio.ByteBuffer;

@Slf4j
public class FileManagementCallback extends AbstractResultCallback<Frame> {


    public FileManagementCallback(Session session) {
        super("容器文件", session);
    }

    @SneakyThrows
    @Override
    public void onStart(Closeable closeable) {
    }

    @SneakyThrows
    @Override
    public void onNext(Frame object) {
        System.out.println(new String(object.getPayload()));
        sendMessage(new String(object.getPayload()));
    }

    @Override
    @SneakyThrows
    public void onError(Throwable throwable) {
        sendMessage("ERROR:" + throwable.getMessage());
        this.close();
    }

    @Override
    @SneakyThrows
    public void onComplete() {
        sendMessage("COMPLETE");
        this.close();
    }


}
