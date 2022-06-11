package com.taoes.simpledocker.service.imple;

import com.taoes.simpledocker.config.securoty.JwtTokenUtil;
import java.util.Collections;
import java.util.Objects;
import java.util.Optional;

import com.taoes.simpledocker.dao.bean.UserDao;
import com.taoes.simpledocker.dao.responsity.UserRepository;
import com.taoes.simpledocker.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

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

    private final JwtTokenUtil tokenUtil;

    @Override
    public String login(String username, String password) {
        // 查询用户信息
        final Optional<UserDao> userOptional = userRepository.findByName(username);
        if (!userOptional.isPresent()) {
            log.warn("用户:{}登录失败,该用户不存在", username);
            throw new RuntimeException("用户名和密码不匹配");
        }
        final UserDao user = userOptional.get();

        // 比对用户信息
        if (!Objects.equals(user.getPassword(), password)) {
            log.warn("用户:{}登录失败，密码不正确", username);
            throw new RuntimeException("用户名和密码不匹配");
        }

        // 生成token
        return tokenUtil.generateToken(new User(username,user.getPassword(), Collections.emptyList()));//createNewToken(username, new ArrayList<>());
    }

    @Override
    public void reset(String username, String password, String newPassword) {
        log.info("准备重置密码：{}", username);
        // TODO 江南 重置密码
    }

    //private String createNewToken(String username, Collection<? extends GrantedAuthority> authorities) {
    //    // 定义存放角色集合的对象
    //    List<String> roleList = new ArrayList<>();
    //    for (GrantedAuthority grantedAuthority : authorities) {
    //        roleList.add(grantedAuthority.getAuthority());
    //    }
    //
    //    // 生成token start
    //    Calendar calendar = Calendar.getInstance();
    //    Date now = calendar.getTime();
    //    calendar.setTime(new Date());
    //    calendar.add(Calendar.HOUR, 2);
    //    Date time = calendar.getTime();
    //    return Jwts.builder()
    //        .setSubject(username)
    //        .setIssuedAt(now)
    //        .setExpiration(time)
    //        .signWith(SignatureAlgorithm.HS512, "SIGNING_KEY")
    //        .compact();
    //}
}
