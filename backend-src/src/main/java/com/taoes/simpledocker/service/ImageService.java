package com.taoes.simpledocker.service;

import java.io.InputStream;
import java.util.List;

import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.model.Image;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 镜像相关服务
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
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

  /**
   * 通过镜像ID获取镜像
   *
   * @param imageId
   * @return
   */
  InspectImageResponse inspect(String imageId);

  /**
   * 重新标记镜像
   *
   * @param imageId 镜像ID
   * @param newTag  新的镜像Tag
   */
  void tag(String imageId, String newTag);

  /**
   * 移除镜像
   *
   * @param imageId 镜像ID
   * @param force
   * @return
   */
  void remove(String imageId, Boolean force);

  /**
   * 导出镜像
   *
   * @param imageId 镜像ID
   */
  void export(String imageId);

  /**
   * 搜索镜像
   *
   * @param key 关键词
   * @apiNote 仅仅在 Docker hub上搜索
   */
  void search(String key);

  /**
   * 移除未使用的镜像
   */
  void remove();

  /**
   * 通过文件路径导入镜像导入镜像
   *
   * @param file 文件路径
   */
  void importByFile(String file);

  /**
   * 通过Tar文件导入镜像
   *
   * @param file
   */
  void importByTar(String file);

  /**
   * @param imageId
   */
  boolean exist(String imageId);

  /**
   * 清理镜像
   */
  void pruneImage();

  /**
   * 镜像保存
   *
   * @return
   */
    InputStream save(String nameTag);

  /**
   * 批量镜像保存
   */
  void saveBatch(List<String> nameTagList, HttpServletRequest request, HttpServletResponse response);
}
