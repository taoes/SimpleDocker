package com.taoes.simpledocker.service.imple;

import java.util.List;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Image;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 镜像相关服务实现
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 7:32 下午
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final DockerClientFactory factory;

    @Override
    public List<Image> list(String key) {
        final DockerClient dockerClient = factory.get();
        return dockerClient.listImagesCmd().exec();
    }

    @Override
    public void tag(String imageId, String newTag) {
        final DockerClient dockerClient = factory.get();
        dockerClient.tagImageCmd(imageId, "", newTag).exec();
    }

    @Override
    public void remove(String imageId) {

    }

    @Override
    public void export(String imageId) {

    }

    @Override
    public void search(String key) {

    }

    @Override
    public void inspect(String imageId) {

    }

    @Override
    public void remove() {

    }

    @Override
    public void importByFile(String file) {

    }

    @Override
    public void importByTar(String file) {

    }
}
