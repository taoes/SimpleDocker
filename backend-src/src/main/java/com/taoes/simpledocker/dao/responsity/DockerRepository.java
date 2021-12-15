package com.taoes.simpledocker.dao.responsity;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.taoes.simpledocker.dao.bean.DockerDao;
import com.taoes.simpledocker.dao.mapper.DockerMapper;
import org.springframework.stereotype.Repository;

/**
 * DockerRepository 对象
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/15 1:18 下午
 */
@Repository
public class DockerRepository extends ServiceImpl<DockerMapper, DockerDao> {
}
