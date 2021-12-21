package com.taoes.simpledocker.service.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;

/**
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/21 11:10 下午
 */
@Slf4j
@Data
@AllArgsConstructor
public class GrantedAuthorityImpl implements GrantedAuthority {

    private String authority;

}
