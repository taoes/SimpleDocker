package com.taoes.simpledocker.converter;

import com.taoes.simpledocker.dao.bean.OperateRecordDao;
import com.taoes.simpledocker.model.OperateRecord;
import com.taoes.simpledocker.utils.JsonUtils;
import org.springframework.stereotype.Component;

@Component
public class OperateRecordConverter extends AbstractConverter<OperateRecordDao, OperateRecord> {

  @Override
  public OperateRecord from(OperateRecordDao operateRecordDao) {
    return null;
  }

  @Override
  public OperateRecordDao to(OperateRecord operateRecord) {
    return new OperateRecordDao()
        .setContent(JsonUtils.toJsonString(operateRecord.getContent()))
        .setName(operateRecord.getName())
        .setUserId(operateRecord.getUserId())
        .setClientId(operateRecord.getClientId())
        .setResource(operateRecord.getResource());
  }
}
