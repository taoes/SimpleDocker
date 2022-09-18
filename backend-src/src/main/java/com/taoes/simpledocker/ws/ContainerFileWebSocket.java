package com.taoes.simpledocker.ws;

import cn.hutool.core.util.StrUtil;
import com.Ostermiller.util.CircularByteBuffer;
import com.github.dockerjava.api.DockerClient;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.ws.callback.FileManagementCallback;
import com.taoes.simpledocker.ws.callback.TerminalResultCallback;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import java.util.Set;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 容器终端服务
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/api/ws/client/{clientId}/container/{containerId}/fs")
public class ContainerFileWebSocket extends AbstractWebSocket {


    private static DockerClientFactory clientFactory;

    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ContainerFileWebSocket.clientFactory = clientFactory;
    }

    @PostConstruct
    public void printWsStartInfo() {
        log.info("文件管理WebSocket初始化完成！");
    }


    @OnOpen
    @SneakyThrows
    public void onOpen(Session session) {
        final Map<String, String> parameters = session.getPathParameters();

        // todo 燕归来兮 检查参数
        final String containerId = parameters.get("containerId");
        final String clientId = parameters.get("clientId");

        try {
            final DockerClient client = clientFactory.get(clientId);
            this.init(session);
            // 创建命令
            final String execId = client.execCreateCmd(containerId)
                    .withCmd("sh")
                    .withAttachStdin(true)
                    .withAttachStdout(true)
                    .withAttachStderr(true)
                    .withPrivileged(true)
                    .withTty(true)
                    .exec().getId();

            // 执行命令
            final FileManagementCallback callback = client.execStartCmd(execId)
                    .withStdIn(this.getInput(session))
                    .exec(new FileManagementCallback(session));
            this.addCallback(session, callback);
        } catch (Exception e) {
            this.onClose(session);
        }
    }

    /**
     * 收到客户端消息后写入输出流
     */
    @SneakyThrows
    @OnMessage
    public void onMessage(String message, Session session) {
        super.write(session, (message + "\r\n").getBytes());
    }
}
