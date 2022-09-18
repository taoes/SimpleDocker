package com.taoes.simpledocker.ws.callback;

import cn.hutool.core.util.StrUtil;
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

        final String content = new String(object.getPayload());

        if (StrUtil.isBlank(content)){
            return;
        }

        if (StrUtil.startWith(content,"ls ")){
            return;
        }

        if (StrUtil.startWith(content,"# ")){
            return;
        }

        sendMessage(content);
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
