package com.taoes.simpledocker.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.taoes.simpledocker.dao.bean.DockerEndpointDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * docker 端点配置
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:17 下午
 */
@Mapper
public interface DockerEndpointMapper extends BaseMapper<DockerEndpointDao> {

}
