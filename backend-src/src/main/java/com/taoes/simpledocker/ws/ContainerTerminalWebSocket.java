package com.taoes.simpledocker.ws;

import java.io.IOException;
import java.io.InputStream;
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

import com.taoes.simpledocker.config.DockerClientFactory;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import okio.ByteString;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 容器终端服务
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/api/ws/container/{cId}/terminal")
public class ContainerTerminalWebSocket {

    private static DockerClientFactory clientFactory;

    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ContainerTerminalWebSocket.clientFactory = clientFactory;
    }

    // 当前在线数
    private static AtomicInteger OnlineCount = new AtomicInteger(0);

    // Session保存
    private static CopyOnWriteArraySet<Session> SessionSet = new CopyOnWriteArraySet<Session>();

    private final Map<String, WebSocket> callbackMap = new ConcurrentHashMap<>();

    /**
     * 输入流，用于接收WebSocket的输入，转发给 ExecStartCmd
     */
    private static Map<String, InputStream> inputStreamMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        log.info("容器终端 WS 初始化 OK！");
    }

    @OnOpen
    @SneakyThrows
    public void onOpen(Session session) {
        SessionSet.add(session);
        OnlineCount.incrementAndGet();

        // 使用 连接 GoWS
        OkHttpClient client = new OkHttpClient();

        final WebSocket webSocket = client.newWebSocket(null, new WebSocketListener() {
            @Override
            public void onClosed(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
                super.onClosed(webSocket, code, reason);
            }

            @Override
            public void onClosing(@NotNull WebSocket webSocket, int code, @NotNull String reason) {
                super.onClosing(webSocket, code, reason);
            }

            @Override
            public void onFailure(@NotNull WebSocket webSocket, @NotNull Throwable t, @Nullable Response response) {
                super.onFailure(webSocket, t, response);
            }

            @Override
            public void onMessage(@NotNull WebSocket webSocket, @NotNull String text) {
                // 接收到GoLang 消息后转发给前端
                SendMessage(session, text);
            }

            @Override
            public void onMessage(@NotNull WebSocket webSocket, @NotNull ByteString bytes) {
                super.onMessage(webSocket, bytes);
            }

            @Override
            public void onOpen(@NotNull WebSocket webSocket, @NotNull Response response) {
                super.onOpen(webSocket, response);
            }
        });
        client.dispatcher().executorService().shutdown();
        callbackMap.put(session.getId(), webSocket);

    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    @SneakyThrows
    public void onClose(Session session) {
        SessionSet.remove(session);
        int cnt = OnlineCount.decrementAndGet();
        System.out.println("ContainerTerminalWebSocket.onClose");
        final WebSocket webSocket = callbackMap.get(session.getId());
        if (webSocket != null && session.isOpen()) { webSocket.close(0, ""); }
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @SneakyThrows
    @OnMessage
    public void onMessage(String message, Session session) {
        final WebSocket webSocket = callbackMap.get(session.getId());
        webSocket.send(message);
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
        final WebSocket webSocket = callbackMap.get(session.getId());
        if (webSocket != null && session.isOpen()) { webSocket.close(0, "ERROR"); }
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
