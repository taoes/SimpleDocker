package com.taoes.simpledocker.service.imple;

import java.util.List;
import java.util.Map;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.TopContainerResponse;
import com.github.dockerjava.api.model.Container;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.service.ContainerService;
import com.taoes.simpledocker.utils.BooleanUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 容器服务实现类
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/10 11:40 下午
 */
@Slf4j
@Service
@AllArgsConstructor
public class ContainerServiceImpl implements ContainerService {

    private DockerClientFactory clientFactory;

    @Override
    public List<Container> list(boolean showAll) {
        final DockerClient client = clientFactory.get();
        return client.listContainersCmd().withShowAll(showAll).exec();
    }

    @Override
    public void run() {
        final DockerClient client = clientFactory.get();
    }

    @Override
    public void start(String containerId) {
        final DockerClient client = clientFactory.get();
        client.startContainerCmd(containerId).exec();
        log.info("启动容器,containerId={}", containerId);
    }

    @Override
    public void stop(String containerId) {
        final DockerClient client = clientFactory.get();
        client.stopContainerCmd(containerId).exec();
        log.info("停止容器,containerId={}", containerId);
    }

    @Override
    public void pause(String containerId) {
        final DockerClient client = clientFactory.get();
        client.pauseContainerCmd(containerId).exec();
        log.info("暂停容器,containerId={}", containerId);
    }

    @Override
    public void unpause(String containerId) {
        final DockerClient client = clientFactory.get();
        client.unpauseContainerCmd(containerId).exec();
        log.info("继续容器,containerId={}", containerId);
    }

    @Override
    public void remove(String containerId, Map<String, String> params) {
        final String force = params.get("force");
        final String removeVolume = params.get("removeVolume");

        final DockerClient client = clientFactory.get();
        client.removeContainerCmd(containerId)
            .withForce(BooleanUtils.parse(force, false))
            .withRemoveVolumes(BooleanUtils.parse(removeVolume, false))
            .exec();
        log.info("移除容器,containerId={} params={}", containerId, params);
    }

    @Override
    public void rename(String containerId, String newName) {
        final DockerClient dockerClient = clientFactory.get();
        dockerClient.renameContainerCmd(containerId)
            .withName(newName)
            .exec();
        log.info("重命名容器:[{}]为[{}]", containerId, newName);
    }

    @Override
    public TopContainerResponse top(String containerId,String psArgs) {
        final DockerClient dockerClient = clientFactory.get();
        return dockerClient.topContainerCmd(containerId)
            .withPsArgs(psArgs)
            .exec();
    }
}
