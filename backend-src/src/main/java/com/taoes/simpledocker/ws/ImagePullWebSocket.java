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

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.PullResponseItem;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.utils.JsonUtils;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * 镜像拉取服务
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/api/ws/image/pull")
public class ImagePullWebSocket {

    private static DockerClientFactory clientFactory;

    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ImagePullWebSocket.clientFactory = clientFactory;
    }

    // 当前在线数
    private static final AtomicInteger OnlineCount = new AtomicInteger(0);

    // Session保存
    private static final CopyOnWriteArraySet<Session> SessionSet = new CopyOnWriteArraySet<Session>();

    // 回调通知函数
    private static final Map<String, ResultCallback<PullResponseItem>> callbackMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        log.info("镜像拉取WebSocket初始化完成！");
    }

    @OnOpen
    public void onOpen(Session session) {
        SessionSet.add(session);
        OnlineCount.incrementAndGet();

        final String imageTag = session.getQueryString().split("=")[1];
        if (!StringUtils.hasText(imageTag)) {
            sendMessage(session, "无效的标签ID，请正确输入后重试");
            return;
        }
        final DockerClient client = clientFactory.get();
        final ResultCallback callback = new ResultCallback<PullResponseItem>() {
            @Override
            public void onStart(Closeable closeable) {}

            @Override
            public void onNext(PullResponseItem object) {
                sendMessage(session, JsonUtils.toJsonString(object));
            }

            @Override
            public void onError(Throwable throwable) {
                try {
                    sendMessage(session, "拉取失败：" + throwable.getMessage());
                    session.close();
                } catch (Exception e) {
                    log.error("发生异常", e);
                }
            }

            @Override
            public void onComplete() {
                try {
                    sendMessage(session, "镜像拉取完成");
                    session.close();
                } catch (IOException e) {
                    log.error("发生异常", e);
                }
            }

            @Override
            public void close() throws IOException {
                try {
                    session.close();
                } catch (IOException e) {
                    log.error("发生异常", e);
                }
            }
        };
        String[] images = imageTag.split(":");
        if (images.length >= 2) {
            client.pullImageCmd(imageTag).exec(callback);
        } else {
            client.pullImageCmd(images[0]).withTag("latest").exec(callback);
        }
        callbackMap.put(session.getId(), callback);
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    @SneakyThrows
    public void onClose(Session session) {
        SessionSet.remove(session);
        final String sessionId = session.getId();
        OnlineCount.decrementAndGet();
        final ResultCallback<PullResponseItem> resultCallback = callbackMap.get(sessionId);
        if (resultCallback != null && session.isOpen()) {resultCallback.close();}
        callbackMap.remove(sessionId);
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    public void onMessage(String message, Session session) {}

    /**
     * 出现错误
     *
     * @param session
     * @param error
     */
    @OnError
    @SneakyThrows
    public void onError(Session session, Throwable error) {
        final String sessionId = session.getId();
        log.error("发生错误：{}，Session ID： {}", error.getMessage(), sessionId);
        ResultCallback<PullResponseItem> callback = callbackMap.get(sessionId);
        if (callback != null && session.isOpen()) {callback.close();}
        callbackMap.remove(sessionId);
    }

    /**
     * 发送消息
     *
     * @param session 回话
     * @param message 消息内容
     */
    public void sendMessage(Session session, String message) {
        if (!session.isOpen()) {
            log.error("Session 已关闭，停止发送消息");
            return;
        }
        try {
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.error("发送消息出错：{}", e.getMessage());
        }
    }
}
