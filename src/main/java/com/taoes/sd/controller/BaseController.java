package com.taoes.sd.controller;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import jakarta.servlet.http.HttpServletRequest;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URI;

/**
 *
 */
public abstract class BaseController {


    @Autowired
    private HttpServletRequest request;

    protected DockerClient localClient = null;

    @SneakyThrows
    protected final synchronized DockerClient getCurrentHost() {
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
