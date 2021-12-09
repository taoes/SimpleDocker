package com.example.simpledocker.ws;

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

import com.example.simpledocker.config.DockerClientFactory;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/ws/image/pull")
public class ImagePullWebSocket {

    private static DockerClientFactory clientFactory;

    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ImagePullWebSocket.clientFactory = clientFactory;
    }

    // 当前在线数
    private static AtomicInteger OnlineCount = new AtomicInteger(0);

    // Session保存
    private static CopyOnWriteArraySet<Session> SessionSet = new CopyOnWriteArraySet<Session>();

    private Map<String, ResultCallback<Frame>> callbackMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        log.info("镜像拉去 WS 初始化 OK！");
    }

    @OnOpen
    public void onOpen(Session session) {
        SessionSet.add(session);
        OnlineCount.incrementAndGet();

        final String param = session.getQueryString();
        final var client = clientFactory.get();

        final ResultCallback callback = client
            .pullImageCmd("")
            .withTag(param)
            .exec(null);
        callbackMap.put(session.getId(), callback);
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    @SneakyThrows
    public void onClose(Session session) {
        SessionSet.remove(session);
        int cnt = OnlineCount.decrementAndGet();
        final ResultCallback<Frame> resultCallback = callbackMap.get(session.getId());
        if (resultCallback != null && session.isOpen()) { resultCallback.close(); }
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("ContainerLogWebSocket.onMessage");
        SendMessage(session, "收到消息，消息内容：" + message);
    }

    /**
     * 出现错误
     *
     * @param session
     * @param error
     */
    @OnError
    @SneakyThrows
    public void onError(Session session, Throwable error) {
        log.error("发生错误：{}，Session ID： {}", error.getMessage(), session.getId());
        final ResultCallback<Frame> resultCallback = callbackMap.get(session.getId());
        if (resultCallback != null && session.isOpen()) { resultCallback.close(); }
    }

    /**
     * 发送消息
     *
     * @param session
     * @param message
     */
    public void SendMessage(Session session, String message) {
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
