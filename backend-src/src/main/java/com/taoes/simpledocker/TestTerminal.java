package com.taoes.simpledocker;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DefaultDockerClientConfig.Builder;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.netty.NettyDockerCmdExecFactory;
import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.UncheckedIOException;
import java.util.Scanner;

public class TestTerminal {


  public static void main(String[] args) throws IOException, InterruptedException {
//    final Builder builder = DefaultDockerClientConfig.createDefaultConfigBuilder();
//    final DockerClient client = DockerClientBuilder.getInstance(builder.build()).build();

    NettyDockerCmdExecFactory factory = new NettyDockerCmdExecFactory();
    Builder configBuilder = new DefaultDockerClientConfig.Builder()
        .withDockerTlsVerify(false)
        .withDockerHost("tcp://192.168.1.105:8082");

    DockerClient client = DockerClientBuilder.getInstance(configBuilder)
        .withDockerCmdExecFactory(factory)
        .build();


    String exeId = client.execCreateCmd("e609c8")
        .withCmd("/bin/sh")
        .withAttachStdin(true)
        .withAttachStdout(true)
        .withAttachStderr(true)
        .withTty(true)
        .exec().getId();

    PipedInputStream pipedInputStream = new PipedInputStream();
    PipedOutputStream pipedOutputStream = new PipedOutputStream();
    pipedInputStream.connect(pipedOutputStream);

    client.execStartCmd(exeId).withTty(true).withStdIn(pipedInputStream)
        .exec(new ResultCallback.Adapter<Frame>() {
          @Override
          public void onNext(Frame object) {
            try {
              System.out.write(object.getPayload());
            } catch (IOException e) {
              throw new UncheckedIOException(e);
            }
          }
        });
    Thread.sleep(3000);
    while (true) {
      Scanner scanner =new Scanner(System.in);
      System.out.print(">");
      final String next = scanner.next();
      pipedOutputStream.write((next + "\r\n").getBytes());
//      pipedOutputStream.write(13);
    }

  }


}
