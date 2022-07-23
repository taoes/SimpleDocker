package com.taoes.simpledocker.service.imple;


import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.service.MonitorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MonitorServiceImpl implements MonitorService {

    private final DockerClientFactory clientFactory;

}
