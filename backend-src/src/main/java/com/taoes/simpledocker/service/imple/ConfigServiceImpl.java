package com.taoes.simpledocker.service.imple;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.stream.Collectors;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.taoes.simpledocker.dao.bean.ConfigDao;
import com.taoes.simpledocker.dao.responsity.ConfigRepository;
import com.taoes.simpledocker.service.ConfigService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

/**
 * 配置查询服务实现类
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/21 11:47 下午
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ConfigServiceImpl implements ConfigService {

    private final ConfigRepository configRepository;

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

    @Override
    @Transactional
    public void save(Map<String, String> configGroup) {
        if (CollectionUtils.isEmpty(configGroup)) {
            return;
        }

        // 清除
        var cleanKeys = configGroup.keySet();
        this.cleanByKeys(cleanKeys);

        // 保存
        var configDaoList = new ArrayList<ConfigDao>();
        for (Entry<String, String> entry : configGroup.entrySet()) {
            ConfigDao configDao = new ConfigDao();
            configDao.setName(entry.getKey());
            configDao.setValue(entry.getValue());
            configDao.setVersion("0");
            configDaoList.add(configDao);
        }
        this.configRepository.saveBatch(configDaoList);
    }

    @Override
    public void cleanByKeys(Set<String> cleanKeys) {
        if (CollectionUtils.isEmpty(cleanKeys)) {
            return;
        }

        var wrapper = new LambdaQueryWrapper<ConfigDao>();
        wrapper.in(ConfigDao::getName, cleanKeys);
        this.configRepository.remove(wrapper);
    }
}
