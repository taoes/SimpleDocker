package com.taoes.simpledocker.ws.callback;

import com.github.dockerjava.api.model.PullResponseItem;
import com.github.dockerjava.api.model.Statistics;
import com.taoes.simpledocker.utils.JsonUtils;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import javax.websocket.Session;

/**
 * 镜像拉取 数据callback
 */
@Slf4j
public class ImagePullCallback extends AbstractResultCallback<PullResponseItem> {


    public ImagePullCallback(Session session) {
        super("镜像拉取", session);
    }


    @SneakyThrows
    @Override
    public void onNext(PullResponseItem item) {
        log.debug("接收到消息:{}", JsonUtils.toJsonString(item));
        sendMessage(JsonUtils.toJsonString(item));
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
        sendMessage("镜像拉取操作完成，请手动刷新镜像列表查看");
        this.close();
    }

}
