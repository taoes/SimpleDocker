package com.taoes.simpledocker.service.imple;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.taoes.simpledocker.converter.UserConverter;
import com.taoes.simpledocker.dao.bean.RoleDao;
import com.taoes.simpledocker.dao.bean.UserDao;
import com.taoes.simpledocker.dao.responsity.RoleRepository;
import com.taoes.simpledocker.dao.responsity.UserRepository;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.model.User;
import com.taoes.simpledocker.model.exception.DataNotFoundException;
import com.taoes.simpledocker.model.exception.ParamCheckException;
import com.taoes.simpledocker.service.RoleService;
import com.taoes.simpledocker.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户服务实现
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/15 1:29 下午
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter userConverter;

    @Autowired
    private RoleService roleService;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User findByAccount(String username) {

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
        LambdaQueryWrapper<UserDao> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByDesc(UserDao::getId);
        final List<UserDao> userList = this.userRepository.list(wrapper);
        return userList.stream().map(userConverter::from).collect(Collectors.toList());
    }

    @Override
    public void authRole(Long userId, List<Integer> roleIds) {
        UserDao user = userRepository.getById(userId);
        if (user == null) {
            throw new DataNotFoundException("用户不存在或已删除");
        }
        if (CollUtil.isNotEmpty(roleIds)) {
            List<RoleDao> roleDaoList = roleRepository.getByIds(roleIds);
            if (roleDaoList.size() != roleIds.size()) {
                throw new ParamCheckException("角色信息有误");
            }
        }
        userRepository.updateRole(userId, roleIds);
    }

    @Override
    public List<Role> getUserRoles(Long userId) {
        UserDao user = userRepository.getById(userId);
        if (user == null) {
            throw new DataNotFoundException("用户不存在或已删除");
        }
        List<Integer> roleIds = UserDao.convertRoleStr2List(user.getRoleIds());
        if (CollUtil.isEmpty(roleIds)) {
            return Collections.emptyList();
        }
        return roleService.getByIds(roleIds);
    }

    @Override
    public void create(User user) {
        final String account = user.getAccount();
        final User userOfExist = this.findByAccount(account);
        if (userOfExist != null){
            throw new ParamCheckException("用户名已存在");
        }

        final UserDao userDao = userConverter.to(user);
        userRepository.save(userDao);
    }



}
