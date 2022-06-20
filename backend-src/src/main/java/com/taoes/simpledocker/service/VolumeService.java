package com.taoes.simpledocker.service;

import com.github.dockerjava.api.command.CreateVolumeResponse;
import com.github.dockerjava.api.command.InspectVolumeResponse;
import com.github.dockerjava.api.command.ListVolumesResponse;

/**
 * 卷服务
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2022/1/1 3:47 PM
 */
public interface VolumeService {

  /**
   * 卷列表
   */
  ListVolumesResponse list();

  /**
   * 创建新的存储卷
   */
  CreateVolumeResponse create(String name, String driver);

  /**
   * 卷详情
   *
   * @param name 卷名
   */
  InspectVolumeResponse inspect(String name);

  /**
   * 移除卷
   *
   * @param name 卷名称
   */
  void remove(String name);
}
