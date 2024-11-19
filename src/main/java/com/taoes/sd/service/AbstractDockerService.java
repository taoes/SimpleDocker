package com.taoes.sd.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import jakarta.annotation.Nonnull;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URI;

@Slf4j
public abstract class AbstractDockerService {

    @Autowired
    private HttpServletRequest request;

    protected DockerClient localClient = null;

    @Nonnull
    @SneakyThrows
    public final synchronized DockerClient getClient() {
        String dockerId = request.getHeader("dockerId");
        log.info("当前请求DockerID={}", dockerId);


        if (this.localClient != null) {
            return localClient;
        }
        var httpClient =
                new ApacheDockerHttpClient.Builder()
                        .dockerHost(new URI("unix:///Users/eleme/.docker/run/docker.sock"))
                        .build();
        localClient = DockerClientBuilder.getInstance().withDockerHttpClient(httpClient).build();
        return localClient;
    }
}
