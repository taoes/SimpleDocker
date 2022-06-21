package com.taoes.simpledocker.ws;

import com.Ostermiller.util.CircularByteBuffer;
import com.github.dockerjava.api.DockerClient;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.ws.callback.TerminalResultCallback;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
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
 * 容器终端服务
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/api/ws/container/{containerId}/terminal")
public class ContainerTerminalWebSocket {


  private static DockerClientFactory clientFactory;

  @Autowired
  public void setChatService(DockerClientFactory clientFactory) {
    ContainerTerminalWebSocket.clientFactory = clientFactory;
  }


  /**
   * 输入流，用于接收WebSocket的输入，转发给 ExecStartCmd
   */
  private static final Map<String, InputStream> ins = new ConcurrentHashMap<>();

  private static final Map<String, OutputStream> outs = new ConcurrentHashMap<>();

  private static final Map<String, TerminalResultCallback> backs = new ConcurrentHashMap<>();


  @OnOpen
  @SneakyThrows
  public void onOpen(Session session) {
    final Map<String, String> parameters = session.getPathParameters();

    final String containerId = parameters.get("containerId");
    final DockerClient client = clientFactory.get("DEFAULT");

    // 创建命令
    final String execId = client.execCreateCmd(containerId)
        .withCmd("sh")
        .withAttachStdin(true)
        .withAttachStdout(true)
        .withAttachStderr(true)
        .withTty(true)
        .exec().getId();

    // 循环缓冲区
    CircularByteBuffer cbb = new CircularByteBuffer();
    final InputStream in = cbb.getInputStream();
    final OutputStream out = cbb.getOutputStream();

    ins.put(session.getId(), in);
    outs.put(session.getId(), out);

    // 执行命令
    final TerminalResultCallback callback = client.execStartCmd(execId)
        .withStdIn(in)
        .withTty(true)
        .exec(new TerminalResultCallback(session));
    backs.put(session.getId(), callback);
  }

  /**
   * Session连接关闭
   */
  @OnClose
  @SneakyThrows
  public void onClose(Session session) {
    try (TerminalResultCallback callback = backs.get(session.getId());
        InputStream inputStream = ins.get(session.getId());
        OutputStream outputStream = outs.get(session.getId());
    ) {

      ins.remove(session.getId());
      outs.remove(session.getId());
      session.close();
    }


  }

  /**
   * 收到客户端消息后写入输出流
   */
  @SneakyThrows
  @OnMessage
  public void onMessage(String message, Session session) {
    final String id = session.getId();
    outs.get(id).write(message.getBytes());
  }

  /**
   * 出现错误
   */
  @OnError
  @SneakyThrows
  public void onError(Session session, Throwable error) {
    log.error("发生错误：{}，Session ID： {}", error.getMessage(), session.getId());

    try (TerminalResultCallback callback = backs.get(session.getId());
        InputStream inputStream = ins.get(session.getId());
        OutputStream outputStream = outs.get(session.getId());
    ) {

      ins.remove(session.getId());
      outs.remove(session.getId());
      session.close();
    }
  }


}
