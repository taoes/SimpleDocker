package com.taoes.simpledocker.ws;

import com.github.dockerjava.api.DockerClient;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.service.ConfigService;
import com.taoes.simpledocker.ws.callback.TerminalResultCallback;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import javax.annotation.PostConstruct;
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
@ServerEndpoint("/api/ws/client/{clientId}/container/{containerId}/terminal")
public class ContainerTerminalWebSocket extends AbstractWebSocket {

    private static DockerClientFactory clientFactory;

    private static ConfigService configService;


    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ContainerTerminalWebSocket.clientFactory = clientFactory;
    }

    @Autowired
    private void setConfigService(ConfigService configService) {
        ContainerTerminalWebSocket.configService = configService;
    }


    @PostConstruct
    public void printWsStartInfo() {
        log.info("容器终端WebSocket初始化完成！");
    }


    @OnOpen
    @SneakyThrows
    public void onOpen(Session session) {
        final Map<String, String> parameters = session.getPathParameters();

        // TODO 燕归来兮 检查参数
        final String containerId = parameters.get("containerId");
        final String clientId = parameters.get("clientId");

        this.init(session);
        final TerminalResultCallback callback = new TerminalResultCallback(session);

        try {
            final DockerClient client = clientFactory.get(clientId);

            // 创建命令
            final String execId = client.execCreateCmd(containerId)
                    .withCmd("sh")
                    .withAttachStdin(true)
                    .withAttachStdout(true)
                    .withAttachStderr(true)
                    .withTty(true)
                    .exec().getId();

            // 执行命令
            client.execStartCmd(execId)
                    .withStdIn(this.getInput(session))
                    .withTty(true)
                    .exec(callback);

            this.addCallback(session, callback);
        } catch (Exception e) {
            this.onClose(session);
        }
    }
}
