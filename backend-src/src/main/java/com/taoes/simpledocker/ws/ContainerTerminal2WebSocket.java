package com.taoes.simpledocker.ws;

import java.io.Closeable;
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
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.command.ExecCreateCmdResponse;
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
@ServerEndpoint("/ws/container2/{cId}/terminal")
public class ContainerTerminal2WebSocket {

    private static DockerClientFactory clientFactory;

    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ContainerTerminal2WebSocket.clientFactory = clientFactory;
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
    @SneakyThrows
    public void onOpen(Session session) {
        SessionSet.add(session);
        OnlineCount.incrementAndGet();

        final Map<String, String> param = session.getPathParameters();
        String cId = param.get("cId");
        final DockerClient dockerClient = clientFactory.get();

        // 创建Exe
        final ExecCreateCmdResponse cmdResponse = dockerClient.execCreateCmd(cId)
            .withCmd("/bin/sh")
            .withAttachStdout(true)
            .withAttachStdin(true)
            .withAttachStderr(true)
            .withTty(true)
            .exec();

        // 附加容器
        pipedInputStream.connect(pipedOutputStream);


        // 启动Exe
        dockerClient.execStartCmd(cmdResponse.getId())
            .withDetach(false)
            .withTty(true)
            .exec(new ResultCallback<Frame>() {
                @Override
                public void onStart(Closeable closeable) {
                    System.out.println("exec ContainerTerminal2WebSocket.onStart");
                }

                @Override
                public void onNext(Frame object) {
                    System.out.println("exec " + object.getStreamType());
                    System.out.println();
                }

                @Override
                public void onError(Throwable throwable) {
                    System.out.println("exec ContainerTerminal2WebSocket.onError");
                }

                @Override
                public void onComplete() {
                    System.out.println("exec ContainerTerminal2WebSocket.onComplete");
                }

                @Override
                public void close() throws IOException {
                    System.out.println("exec ContainerTerminal2WebSocket.close");
                }
            });





        ResultCallback.Adapter<Frame> callback = new ResultCallback.Adapter<Frame>() {
            @Override
            public void onNext(Frame frame) {
                System.out.println(frame.getStreamType());
            }
        };

        final ResultCallback<Frame> exec = dockerClient.attachContainerCmd(cId)
            .withStdIn(pipedInputStream)
            .withFollowStream(true)
            .withStdOut(true)
            .withStdErr(true)
            .exec(callback);

        System.out.println("等待OK....");
        Thread.sleep(10_000);
        pipedOutputStream.write("ls\n".getBytes());
        pipedOutputStream.flush();


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
        final ResultCallback<Frame> resultCallback = callbackMap.get(session.getId());
        if (resultCallback != null && session.isOpen()) { resultCallback.close(); }
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @SneakyThrows
    @OnMessage
    public void onMessage(String message, Session session) {
        pipedOutputStream.write((message + "\n").getBytes(StandardCharsets.UTF_8));
        pipedOutputStream.flush();
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
