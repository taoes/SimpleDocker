package com.taoes.simpledocker.service.imple;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.taoes.simpledocker.dao.bean.ConfigDao;
import com.taoes.simpledocker.dao.responsity.ConfigRepository;
import com.taoes.simpledocker.service.ConfigService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 配置查询服务实现类
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/21 11:47 下午
 */
@Slf4j
@Service
public class ConfigServiceImpl implements ConfigService {

    @Autowired
    private ConfigRepository configRepository;

    @Override
    public Map<String, String> findConfigByKeys(Set<String> names) {
        final List<ConfigDao> configList = configRepository.findByNames(names);
        final Map<String, String> config =
            configList.stream()
                .collect(Collectors.toMap(ConfigDao::getName, ConfigDao::getValue));
        final var result = new HashMap<String, String>();
        for (String name : names) {
            String value = config.getOrDefault(name, "");
            result.put(name, value);
        }
        return result;
    }
}
