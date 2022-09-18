package com.taoes.simpledocker.service.imple;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.dao.responsity.EndpointRepository;
import com.taoes.simpledocker.service.DockerFileService;
import com.taoes.simpledocker.ws.callback.FileManagementCallback;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.Closeable;
import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class DockerFileServiceImpl implements DockerFileService {

    private final DockerClientFactory clientFactory;



    @Override
    public String path(String path) {
        final DockerClient client = clientFactory.get("DEFAULT");
        // 创建命令
        final String execId = client.execCreateCmd("7307128bfd32")
                .withCmd("ls","-la")
                .withWorkingDir(path)
                .withAttachStdin(true)
                .withAttachStdout(true)
                .withAttachStderr(true)
                .withPrivileged(true)
                .withTty(true)
                .exec().getId();

        // 执行命令
        client.execStartCmd(execId).exec(new ResultCallback<Frame>() {
            @Override
            public void onStart(Closeable closeable) {

            }

            @Override
            public void onNext(Frame object) {
                System.out.println(new String(object.getPayload()));
            }

            @Override
            public void onError(Throwable throwable) {

            }

            @Override
            public void onComplete() {

            }

            @Override
            public void close() throws IOException {

            }
        });
        return "PK";
    }
}
