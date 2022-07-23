package com.taoes.simpledocker.ws;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.ws.callback.ContainerLogResultCallback;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
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
 * 容器日志服务
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/5 1:33 上午
 */
@Slf4j
@Component
@ServerEndpoint("/api/ws/client/{clientId}/container/{containerId}/log")
public class ContainerLogWebSocket extends AbstractWebSocket {

    private static DockerClientFactory clientFactory;

    @Autowired
    public void setChatService(DockerClientFactory clientFactory) {
        ContainerLogWebSocket.clientFactory = clientFactory;
    }

    @PostConstruct
    public void printWsStartInfo() {
        log.info("容器日志WebSocket初始化完成！");
    }


    @OnOpen
    public void onOpen(Session session) {
        final Map<String, String> param = session.getPathParameters();

        // todo 燕归来兮 检查参数
        final String containerId = param.get("containerId");
        final String clientId = param.get("clientId");

        try {
            final DockerClient client = clientFactory.get(clientId);
            this.init(session);
            final ResultCallback.Adapter<Frame> callback = client
                    .logContainerCmd(containerId)
                    .withFollowStream(true)
                    .withStdErr(true)
                    .withStdOut(true)
                    .withTail(1000)
                    .exec(new ContainerLogResultCallback(session));
            this.addCallback(session, callback);
        } catch (Exception e) {
            this.onClose(session);
        }
    }
}
