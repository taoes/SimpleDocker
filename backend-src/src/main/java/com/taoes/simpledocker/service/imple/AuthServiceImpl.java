package com.taoes.simpledocker.service.imple;

import cn.dev33.satoken.stp.StpUtil;
import com.taoes.simpledocker.model.exception.AuthFailException;
import com.taoes.simpledocker.dao.bean.UserDao;
import com.taoes.simpledocker.dao.responsity.UserRepository;
import com.taoes.simpledocker.model.exception.DataNotFoundException;
import com.taoes.simpledocker.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

//import org.springframework.security.core.GrantedAuthority;

/**
 * 授权服务接口实现
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
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
        final Optional<UserDao> userOptional = userRepository.findByName(username);
        if (!userOptional.isPresent()) {
            log.warn("用户:{}登录失败,该用户不存在", username);
            throw new DataNotFoundException("用户名和密码不匹配");
        }
        final UserDao user = userOptional.get();

        // 比对用户信息
        if (!Objects.equals(user.getPassword(), password)) {
            log.warn("用户:{}登录失败，密码不正确", username);
            throw new AuthFailException("用户名和密码不匹配");
        }
        StpUtil.login(user.getId());
        return StpUtil.getTokenValue();
    }

    @Override
    public void logout() {
        log.info("id = {} 退出登录", StpUtil.getLoginIdDefaultNull());
        StpUtil.logout();
    }


    @Override
    public void reset(String username, String password, String newPassword) {
        final Optional<UserDao> userOptional = userRepository.findByName(username);
        if (!userOptional.isPresent()) {
            log.warn("用户:{}登录失败,该用户不存在", username);
            throw new DataNotFoundException("用户不存在或已删除");
        }
        final UserDao user = userOptional.get();
        if (!StringUtils.equals(user.getPassword(), password)) {
            log.warn("用户:{} 密码验证失败", username);
            throw new AuthFailException("原始密码不正确");
        }
        user.setPassword(newPassword);
        userRepository.updatePasswd(user);
        StpUtil.logout();
    }


}
