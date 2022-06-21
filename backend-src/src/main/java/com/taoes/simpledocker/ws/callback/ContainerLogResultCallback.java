package com.taoes.simpledocker.ws.callback;

import com.github.dockerjava.api.model.Frame;
import java.io.Closeable;
import java.io.IOException;
import javax.websocket.Session;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ContainerLogResultCallback extends AbstractResultCallback {

  private final Session session;

  public ContainerLogResultCallback(Session session) {
    this.session = session;
  }


  @SneakyThrows
  @Override
  public void onStart(Closeable closeable) {
  }

  @SneakyThrows
  @Override
  public void onNext(Frame object) {
    final byte[] payload = object.getPayload();
    sendMessage(session, new String(payload) + "\r\n");

  }

  @Override
  @SneakyThrows
  public void onError(Throwable throwable) {
    sendMessage(session, "\u001B[31m 出现异常:" + throwable.getMessage() + "\u001B[0m \n");
    session.close();
  }

  @Override
  @SneakyThrows
  public void onComplete() {
    sendMessage(session, "\u001B[31m 终端服务已关闭，如需再次进入请尝试刷新或者在容器管理页进入  \u001B[0m");
    session.close();
  }

  @Override
  @SneakyThrows
  public void close() throws IOException {
    session.close();
  }
}
