package com.taoes.simpledocker.image;

import java.util.List;

import com.github.dockerjava.api.model.Container;
import com.taoes.simpledocker.SimpleDockerApplication;
import com.taoes.simpledocker.service.ContainerService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * 镜像的相关测试
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/21 8:17 下午
 */

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SimpleDockerApplication.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ContainerTest {

    @Autowired
    private ContainerService containerService;

    @Test
    public void testContainerList() {
        final List<Container> resp = containerService.list(true);
        assert resp != null;
    }
}
