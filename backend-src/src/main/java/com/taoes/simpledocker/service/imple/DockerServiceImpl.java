package com.taoes.simpledocker.service.imple;

import java.util.ArrayList;
import java.util.List;

import com.taoes.simpledocker.model.Docker;
import com.taoes.simpledocker.service.DockerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Docker 服务实现
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/15 1:30 下午
 */
@Slf4j
@Service
public class DockerServiceImpl implements DockerService {
    @Override
    public List<Docker> list() {
        ArrayList<Docker> dockers = new ArrayList<>();
        dockers.add(new Docker());
        return dockers;
    }
}
