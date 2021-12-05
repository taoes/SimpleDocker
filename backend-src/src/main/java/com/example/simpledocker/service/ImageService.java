package com.example.simpledocker.service;

import java.util.List;

import com.github.dockerjava.api.model.Image;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/5 12:47 上午
 */
public interface ImageService {

    /**
     * 获取镜像列表
     *
     * @param key 搜索词
     * @return
     */
    List<Image> list(String key);


}
