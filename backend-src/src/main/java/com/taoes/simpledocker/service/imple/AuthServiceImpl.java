package com.taoes.simpledocker.service.imple;

import com.taoes.simpledocker.dao.responsity.UserRepository;
import com.taoes.simpledocker.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 授权服务接口实现
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/15 1:24 下午
 */
@Slf4j
@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;



    @Override
    public String login(String username, String password) {
        // 查询用户信息

        // 比对用户信息

        // 生成token
        return null;
    }
}
