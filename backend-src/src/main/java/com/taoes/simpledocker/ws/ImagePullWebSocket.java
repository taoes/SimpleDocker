package com.taoes.simpledocker.ws;

import java.io.Closeable;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import cn.hutool.core.util.StrUtil;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.PullResponseItem;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.utils.JsonUtils;
import com.taoes.simpledocker.ws.callback.AbstractResultCallback;
import com.taoes.simpledocker.ws.callback.ImagePullCallback;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * 镜像拉取服务
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/api/ws/image/pull")
public class ImagePullWebSocket extends AbstractWebSocket {

    private static DockerClientFactory clientFactory;


    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ImagePullWebSocket.clientFactory = clientFactory;
    }


    @PostConstruct
    public void printWsStartInfo() {
        log.info("镜像拉取WebSocket初始化完成！");
    }

    @OnOpen
    public void onOpen(Session session) {
        this.init(session);

        final String imageTag = this.parseParams(session).get("imageTag");
        if (StrUtil.isBlank(imageTag)) {
            write(session,"无效的标签ID，请正确输入后重试".getBytes());
            this.onClose(session);
            return;
        }


        final DockerClient client = clientFactory.get();
        final AbstractResultCallback<PullResponseItem> callback = new ImagePullCallback(session);

        try {
            final String[] images = imageTag.split(":");
            if (images.length >= 2) {
                client.pullImageCmd(imageTag).exec(callback);
            } else {
                client.pullImageCmd(images[0]).withTag("latest").exec(callback);
            }
            this.addCallback(session, callback);
        } catch (Exception e) {
            this.onClose(session);
        }
    }


}
