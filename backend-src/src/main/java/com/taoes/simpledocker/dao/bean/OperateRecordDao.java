package com.taoes.simpledocker.dao.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.taoes.simpledocker.model.enums.OperatorResource;
import lombok.Data;

@Data
@TableName("record")
public class OperateRecordDao {

  @TableId(type = IdType.AUTO)
  private Long id;

  private Long clientId;

  private Long userId;

  private String name;

  private OperatorResource resource;

  private String content;
}
