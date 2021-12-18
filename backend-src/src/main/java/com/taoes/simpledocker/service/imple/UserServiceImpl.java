package com.taoes.simpledocker.service.imple;

import com.taoes.simpledocker.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:29 下午
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Override
    public User findByName(String username) {
        return null;
    }

    @Override
    public void disabled(Long id) {

    }

    @Override
    public void enabled(Long id) {

    }
}
