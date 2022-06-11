package com.taoes.simpledocker.service;

import com.taoes.simpledocker.model.OperateRecord;

/**
 * 操作记录查询服务
 */
public interface OperateRecordService {

  /**
   * 新增操作日志
   */
  void add(OperateRecord record);

}
