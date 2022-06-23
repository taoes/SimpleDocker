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
import com.github.dockerjava.api.model.Statistics;
import com.taoes.simpledocker.config.DockerClientFactory;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 容器资源使用情况服务
 *
 * @author taozhou.tao@alibaba-inc.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/api/ws/container/{cId}/stat")
public class ContainerStatWebSocket {

    private static DockerClientFactory clientFactory;

    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ContainerStatWebSocket.clientFactory = clientFactory;
    }

    // 当前在线数
    private AtomicInteger OnlineCount = new AtomicInteger(0);

    // Session保存
    private static CopyOnWriteArraySet<Session> SessionSet = new CopyOnWriteArraySet<Session>();

    private Map<String, ResultCallback<Statistics>> callbackMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        log.info("容器资源使用情况 WS 初始化 OK！");
    }

    @OnOpen
    public void onOpen(Session session) {
        SessionSet.add(session);
        final int i = OnlineCount.incrementAndGet();
        log.info("有连接接入，当前连接数为：{}", i);

        // TODO 校验容器存在

        final Map<String, String> param = session.getPathParameters();
        final DockerClient client = clientFactory.get();
        final ResultCallback<Statistics> callback = client.statsCmd(param.get("cId")).exec(
            new ResultCallback<Statistics>() {
                @Override
                public void onStart(Closeable closeable) {

                }

                @Override
                public void onNext(Statistics object) {
                    SendMessage(session, "");
                }

                @Override
                public void onError(Throwable throwable) {

                }

                @Override
                public void onComplete() {

                }

                @Override
                public void close() throws IOException {

                }
            });
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
        final ResultCallback<Statistics> resultCallback = callbackMap.get(session.getId());
        if (resultCallback != null && session.isOpen()) { resultCallback.close(); }
        log.info("有连接关闭，当前连接数为：{}", cnt);
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
        System.out.println("ContainerLogWebSocket.onError");
        log.error("发生错误：{}，Session ID： {}", error.getMessage(), session.getId());

        final ResultCallback<Statistics> resultCallback = callbackMap.get(session.getId());
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
            return;
        }
        try {
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.error("发送消息出错：{}", e.getMessage());
        }
    }

}
