package com.taoes.simpledocker.service.imple;

import cn.dev33.satoken.stp.StpInterface;
import cn.hutool.core.collection.CollUtil;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.service.UserService;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author manwang (569258yin)
 * @date 2022/7/16 13:38
 */
@Service
public class StpInterfaceImpl implements StpInterface {


    @Autowired
    private UserService userService;


    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        List<Role> roles = userService.getUserRoles(NumberUtils.toLong(loginId.toString()));
        if (CollUtil.isEmpty(roles)) {
            return Collections.emptyList();
        }
        return Role.getAllPermissions(roles);
    }

    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        List<Role> roles = userService.getUserRoles(NumberUtils.toLong(loginId.toString()));
        if (CollUtil.isEmpty(roles)) {
            return Collections.emptyList();
        }
        return roles.stream().map(Role::getName).collect(Collectors.toList());
    }
}
