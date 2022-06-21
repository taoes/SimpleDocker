package com.taoes.simpledocker.ws.callback;

import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import java.nio.ByteBuffer;
import javax.websocket.Session;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractResultCallback  extends ResultCallback.Adapter<Frame>{

  /**
   * 发送消息
   */
  public void sendMessage(Session session, String message) {
    try {
      session.getBasicRemote().sendText(message);
    } catch (Exception e) {
      log.error("发送消息出错：{}", e.getMessage());
    }
  }

  public void sendMessage(Session session, ByteBuffer message) {
    try {
      session.getBasicRemote().sendBinary(message);
    } catch (Exception e) {
      log.error("发送消息出错：{}", e.getMessage());
    }
  }
}
