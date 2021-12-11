package com.taoes.simpledocker.ws;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.nio.charset.StandardCharsets;
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
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.command.ExecCreateCmdResponse;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.transport.DockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient.Request;
import com.github.dockerjava.transport.DockerHttpClient.Request.Method;
import com.github.dockerjava.transport.DockerHttpClient.Response;
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

    private final Map<String, ResultCallback<Frame>> callbackMap = new ConcurrentHashMap<>();

    /**
     * 输入流，用于接收WebSocket的输入，转发给 ExecStartCmd
     */
    private static Map<String, InputStream> inputStreamMap = new ConcurrentHashMap<>();

    static PipedOutputStream pipedOutputStream = new PipedOutputStream();
    static PipedInputStream pipedInputStream = new PipedInputStream();

    @PostConstruct
    public void init() {
        log.info("容器终端 WS 初始化 OK！");
    }

    @OnOpen
    public void onOpen(Session session) throws IOException, InterruptedException {
        SessionSet.add(session);
        OnlineCount.incrementAndGet();

        final Map<String, String> params = session.getPathParameters();
        final DockerHttpClient httpClient = clientFactory.getHttpClient();

        String cont = "{\n"
            + "  \"AttachStdin\": true,\n"
            + "  \"AttachStdout\": true,\n"
            + "  \"AttachStderr\": true,\n"
            + "  \"DetachKeys\": \"ctrl-p,ctrl-q\",\n"
            + "  \"Tty\": true,\n"
            + "  \"Cmd\": [\n"
            + "    \"sh\"\n"
            + "  ],\n"
            + "  \"Env\": [\n"
            + "    \"FOO=bar\",\n"
            + "    \"BAZ=quux\"\n"
            + "  ]\n"
            + "}";
        final Response execute = httpClient.execute(Request.builder()
            .method(Method.POST)
            .putHeader("Content-Type", "application/json")
            .path("/containers/" + params.get("cId") + "/exec")
            .body(new ByteArrayInputStream(cont.getBytes()))
            .build());
        final InputStream body = execute.getBody();
        byte[] bytes = new byte[1024];
        Thread.sleep(1000);
        body.read(bytes);
        String str = new String(bytes);

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        final ExecCreateCmdResponse execCreateCmdResponse = mapper.readValue(str, ExecCreateCmdResponse.class);
        System.out.println("EXEC=" + execCreateCmdResponse.getId());
        //language=JSON
        cont = "{\n"
            + "  \"Detach\": false,\n"
            + "  \"Tty\": false\n"
            + "}";
        pipedInputStream.connect(pipedOutputStream);
        Request request = Request.builder()
            .method(Method.POST)
            .path("/exec/" + execCreateCmdResponse.getId() + "/start")
            .putHeader("Content-Type", "application/json")
            .body(new ByteArrayInputStream(cont.getBytes()))
            .build();
        final Response httpResponse = httpClient.execute(request);
        final InputStream resultInput = httpResponse.getBody();

        new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    byte[] bytes;
                    while (true) {
                        bytes = new byte[100];
                        final int read = resultInput.read(bytes);
                        System.out.print(read);
                        if (read != -1) {
                            String str = new String(bytes);
                            log.info("收到数据：" + str);
                            SendMessage(session, "OK");
                        } else {
                            Thread.sleep(1000);
                        }
                    }
                } catch (Throwable e) {
                    e.printStackTrace();
                }
                System.out.println("ContainerTerminalWebSocket.run");
            }
        }).start();

        Request attachRequest = Request.builder()
            .method(Method.POST)
            .putHeader("Content-Type", "application/vnd.docker.raw-stream")
            .path("/containers/" + params.get("cId") + "/attach?stream=1&stdout=1")
            .hijackedInput(pipedInputStream)
            .build();
        final InputStream body1 = httpClient.execute(attachRequest).getBody();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {

                    byte[] bytes = new byte[100];
                    while (true) {
                        final int read = body1.read(bytes);
                        if (read == -1) {
                            System.out.println("-");
                            Thread.sleep(10);
                            continue;
                        }
                        String str = new String(bytes);
                        log.info("attach 收到数据：" + str);
                        SendMessage(session, "OK");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session) throws IOException {
        SessionSet.remove(session);
        int cnt = OnlineCount.decrementAndGet();
        System.out.println("ContainerTerminalWebSocket.onClose");
        final ResultCallback<Frame> resultCallback = callbackMap.get(session.getId());
        if (resultCallback != null && session.isOpen()) { resultCallback.close(); }
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        pipedOutputStream.write(message.getBytes(StandardCharsets.UTF_8));
        pipedOutputStream.flush();
    }

    /**
     * 出现错误
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) throws IOException {
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
