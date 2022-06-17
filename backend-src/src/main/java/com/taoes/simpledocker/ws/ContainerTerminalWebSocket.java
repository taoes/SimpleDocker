package com.taoes.simpledocker.ws;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DefaultDockerClientConfig.Builder;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.netty.NettyDockerCmdExecFactory;
import com.taoes.simpledocker.config.DockerClientFactory;
import java.io.Closeable;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
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
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import okhttp3.WebSocket;
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
  private static Map<String, InputStream> ins = new ConcurrentHashMap<>();
  private static Map<String, OutputStream> outs = new ConcurrentHashMap<>();

  @PostConstruct
  public void init() {
    log.info("容器终端 WS 初始化 OK！");
  }

  @OnOpen
  @SneakyThrows
  public void onOpen(Session session) {
    final Map<String, String> parameters = session.getPathParameters();
    SessionSet.add(session);
    OnlineCount.incrementAndGet();

    final String cId = parameters.get("cId");

    // 创建命令
    NettyDockerCmdExecFactory factory = new NettyDockerCmdExecFactory();
    Builder configBuilder = new DefaultDockerClientConfig.Builder()
        .withDockerTlsVerify(false)
        .withDockerHost("tcp://192.168.1.104:8082");
    DockerClient client = DockerClientBuilder.getInstance(configBuilder)
        .withDockerCmdExecFactory(factory)
        .build();
    final String execId = client.execCreateCmd(cId)
        .withCmd("/bin/sh")
        .withAttachStdin(true)
        .withAttachStdout(true)
        .withAttachStderr(true)
        .withTty(true)
        .exec().getId();

    // 构建输入输出流
    PipedInputStream in = new PipedInputStream();
    PipedOutputStream out = new PipedOutputStream();
    in.connect(out);

    ins.put(session.getId(), in);
    outs.put(session.getId(), out);

    // 执行命令
    client.execStartCmd(execId).withTty(true)
        .withStdIn(in)
        .exec(new ResultCallback.Adapter<Frame>() {
          @SneakyThrows
          @Override
          public void onStart(Closeable closeable) {
            sendMessage(session,"正在连接");
          }

          @SneakyThrows
          @Override
          public void onNext(Frame object) {
            sendMessage(session, new String(object.getPayload()));
          }

          @Override
          @SneakyThrows
          public void onError(Throwable throwable) {
            sendMessage(session, "出现异常:" + throwable.getMessage());
          }

          @Override
          @SneakyThrows
          public void onComplete() {
            sendMessage(session, "已完成");
          }

          @Override
          @SneakyThrows
          public void close() throws IOException {
            sendMessage(session, "已关闭");
          }
        });
    log.info("open ok!");
  }

  /**
   * 连接关闭调用的方法
   */
  @OnClose
  @SneakyThrows
  public void onClose(Session session) {
    final String id = session.getId();
    SessionSet.remove(session);
    try (InputStream stream = ins.get(id)) {
      if (stream != null && session.isOpen()) {
        stream.close();
      }
      ins.remove(id);
    }

    try (OutputStream stream = outs.get(id)) {
      if (stream != null && session.isOpen()) {
        stream.close();
      }
      outs.remove(id);
    }
  }

  /**
   * 收到客户端消息后调用的方法
   *
   * @param message 客户端发送过来的消息
   */
  @SneakyThrows
  @OnMessage
  public void onMessage(String message, Session session) {
    final String id = session.getId();
    outs.get(id).write(message.getBytes());
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
    final String id = session.getId();
    SessionSet.remove(session);
    try (InputStream stream = ins.get(id)) {
      if (stream != null && session.isOpen()) {
        stream.close();
      }
      ins.remove(id);
    }

    try (OutputStream stream = outs.get(id)) {
      if (stream != null && session.isOpen()) {
        stream.close();
      }
      outs.remove(id);
    }
  }

  /**
   * 发送消息
   *
   * @param session
   * @param message
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
