package com.taoes.simpledocker.service.imple;

import com.taoes.simpledocker.converter.OperateRecordConverter;
import com.taoes.simpledocker.dao.bean.OperateRecordDao;
import com.taoes.simpledocker.dao.responsity.OperateRecordRepository;
import com.taoes.simpledocker.model.OperateRecord;
import com.taoes.simpledocker.service.OperateRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OperateRecordServiceImpl implements OperateRecordService {

  private final OperateRecordConverter converter;

  private final OperateRecordRepository repository;

  @Override
  public void add(OperateRecord record) {
    final OperateRecordDao recordDao = converter.to(record);
    repository.save(recordDao);
  }
}
