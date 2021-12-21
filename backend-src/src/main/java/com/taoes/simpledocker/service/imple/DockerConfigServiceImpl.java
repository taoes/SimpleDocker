package com.taoes.simpledocker.service.imple;

import java.util.ArrayList;
import java.util.List;

import com.taoes.simpledocker.model.Docker;
import com.taoes.simpledocker.service.DockerConfigService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Docker 服务实现
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:30 下午
 */
@Slf4j
@Service
@AllArgsConstructor
public class DockerConfigServiceImpl implements DockerConfigService {

    @Override
    public List<Docker> list() {
        ArrayList<Docker> dockers = new ArrayList<>();
        dockers.add(new Docker());
        return dockers;
    }

}
