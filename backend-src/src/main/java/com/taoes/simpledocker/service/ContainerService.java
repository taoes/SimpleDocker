package com.taoes.simpledocker.service;

import java.util.List;
import java.util.Map;

import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.InspectContainerResponse;
import com.github.dockerjava.api.command.TopContainerResponse;
import com.github.dockerjava.api.model.Container;
import com.taoes.simpledocker.controller.container.RunNewContainerRequest;

/**
 * 容器服务接口
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/10 11:31 下午
 */
public interface ContainerService {

  /**
   * 查询容器列表
   *
   * @param showAll
   */
  List<Container> list(boolean showAll);

  /**
   * 运行新的容器
   *
   * @return
   */
  CreateContainerResponse run(RunNewContainerRequest request);

  /**
   * 启动一个已经存在的容器
   *
   * @param containerId 容器ID
   */
  void start(String containerId);

  /**
   * 停止容器
   *
   * @param containerId 停止的容器ID
   */
  void stop(String containerId);

  /**
   * 暂停容器
   *
   * @apiNote 暂停指定容器(异步暂停)
   */
  void pause(String containerId);

  /**
   * 取消暂停容器
   *
   * @param containerId 容器ID
   * @apiNote 取消暂停容器
   */
  void unpause(String containerId);

  /**
   * 移除指定容器
   *
   * @param containerId 容器ID
   * @param param       辅助操作的参数
   */
  void remove(String containerId, Map<String, String> param);

  /**
   * 获取容器的资源使用情况
   *
   * @param containerId 容器ID
   */
  void rename(String containerId, String newName);

  /**
   * 查询容器的线程信息
   *
   * @param containerId 容器ID
   * @param psArgs      进程参数
   * @return
   */
  TopContainerResponse top(String containerId, String psArgs);

  /**
   * 查询容器详情
   *
   * @param containerId
   * @return
   */
  InspectContainerResponse inspect(String containerId);

}
