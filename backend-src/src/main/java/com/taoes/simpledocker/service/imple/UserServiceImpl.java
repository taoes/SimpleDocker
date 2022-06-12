package com.taoes.simpledocker.service.imple;

import com.taoes.simpledocker.converter.UserConverter;
import com.taoes.simpledocker.dao.responsity.UserRepository;
import com.taoes.simpledocker.model.User;
import com.taoes.simpledocker.service.UserService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter userConverter;
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

    @Override
    public List<User> list() {
        return userRepository.list().stream().map(userConverter::from).collect(Collectors.toList());
    }
}
