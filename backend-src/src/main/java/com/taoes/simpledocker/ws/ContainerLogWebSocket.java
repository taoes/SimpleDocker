package com.taoes.simpledocker.ws;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.ws.callback.ContainerLogResultCallback;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import javax.annotation.PostConstruct;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 容器日志服务
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/api/ws/container/{cId}/log")
public class ContainerLogWebSocket {

    private static DockerClientFactory clientFactory;

    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ContainerLogWebSocket.clientFactory = clientFactory;
    }

    // 当前在线数
    private final static AtomicInteger OnlineCount = new AtomicInteger(0);

    private Map<String, ResultCallback<Frame>> callbackMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        log.info("容器日志 WS 初始化 OK！");
    }

    @OnOpen
    public void onOpen(Session session) {
        final int i = OnlineCount.incrementAndGet();
        log.info("有连接接入，当前连接数为：{}", i);

        final Map<String, String> param = session.getPathParameters();
        final DockerClient client = clientFactory.get("DEFAULT2");
        final ResultCallback<Frame> callback = client
            .logContainerCmd(param.get("cId"))
            .withFollowStream(true)
            .withStdErr(true)
            .withStdOut(true)
            .withTail(1000)
            .exec(new ContainerLogResultCallback(session));
        callbackMap.put(session.getId(), callback);
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    @SneakyThrows
    public void onClose(Session session) {
        int cnt = OnlineCount.decrementAndGet();
        final ResultCallback<Frame> resultCallback = callbackMap.get(session.getId());
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
            return;
        }
        try {
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.error("发送消息出错：{}", e.getMessage());
        }
    }

}
