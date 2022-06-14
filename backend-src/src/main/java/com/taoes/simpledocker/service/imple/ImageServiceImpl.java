package com.taoes.simpledocker.service.imple;

import com.taoes.simpledocker.model.exception.NotFoundClientException;
import java.util.List;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.exception.NotFoundException;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.PruneType;
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
    public InspectImageResponse inspect(String imageId) {
        final DockerClient dockerClient = factory.get();
        return dockerClient.inspectImageCmd(imageId).exec();
    }

    @Override
    public void tag(String imageId, String newTag) {
        final InspectImageResponse image = inspect(imageId);
        if (image == null){
            throw new NotFoundClientException("操作失败，镜像不存在");
        }
        final DockerClient dockerClient = factory.get();
        dockerClient.tagImageCmd(imageId, image.getRepoTags().get(0), newTag).exec();
    }

    @Override
    public void remove(String imageId, Boolean force) {
        final DockerClient client = factory.get();
        client.removeImageCmd(imageId).withForce(force).exec();
    }

    @Override
    public void export(String imageId) {

    }

    @Override
    public void search(String key) {

    }

    @Override
    public void remove() {
        final DockerClient client = factory.get();
    }

    @Override
    public void importByFile(String file) {

    }

    @Override
    public void importByTar(String file) {

    }

    @Override
    public boolean exist(String imageId) {
        final DockerClient client = factory.get();
        try {
            final InspectImageResponse inspectImage = client.inspectImageCmd(imageId).exec();
            return inspectImage != null;
        } catch (NotFoundException e) {
            return false;
        }
    }

    @Override
    public void pruneImage() {
        final DockerClient dockerClient = factory.get();
        dockerClient.pruneCmd(PruneType.IMAGES).exec();
    }
}
