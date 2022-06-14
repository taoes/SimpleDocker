package com.taoes.simpledocker.controller.image;

import cn.hutool.core.util.StrUtil;
import com.taoes.simpledocker.model.exception.ParamCheckException;
import lombok.Data;

@Data
public class ImageTagUpdateRequest {

  /**
   * 镜像ID
   */
  private String imageId;

  /**
   * 新的标签名
   */
  private String newTag;

  public boolean check() {
    if (StrUtil.isEmpty(imageId) || StrUtil.isBlank(newTag)) {
      throw new ParamCheckException("更新失败，镜像ID或者标签名不能为空");
    }
    return true;
  }


}
