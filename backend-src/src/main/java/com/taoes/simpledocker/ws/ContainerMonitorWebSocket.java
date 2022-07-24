package com.taoes.simpledocker.ws;

import com.github.dockerjava.api.DockerClient;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.ws.callback.ContainerMonitorCallback;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;

/**
 * 容器状态监控服务
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/api/ws/client/{clientId}/container/{containerId}/monitor")
public class ContainerMonitorWebSocket extends AbstractWebSocket {

    private static DockerClientFactory clientFactory;

    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ContainerMonitorWebSocket.clientFactory = clientFactory;
    }

    @PostConstruct
    public void printWsStartInfo() {
        log.info("容器状态WebSocket初始化完成！");
    }


    @OnOpen
    @SneakyThrows
    public void onOpen(Session session) {
        final Map<String, String> parameters = session.getPathParameters();

        final String containerId = parameters.get("containerId");
        final String clientId = parameters.get("clientId");

        final DockerClient client = clientFactory.get(clientId);

        this.init(session);
        final ContainerMonitorCallback callback = new ContainerMonitorCallback(session);
        try {
            client.statsCmd(containerId).exec(callback);
            this.addCallback(session, callback);
        } catch (Exception e) {
            this.onClose(session);
        }
    }
}
