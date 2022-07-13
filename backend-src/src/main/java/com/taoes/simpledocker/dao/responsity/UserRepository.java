package com.taoes.simpledocker.dao.responsity;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.taoes.simpledocker.dao.bean.UserDao;
import com.taoes.simpledocker.dao.mapper.UserMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * UserRepository 对象¬
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:18 下午
 */
@Repository
public class UserRepository extends ServiceImpl<UserMapper, UserDao> {

    /**
     * 根据用户名查询用户信息
     *
     * @param username 用户名
     * @return 查询到的用户信息
     */
    public Optional<UserDao> findByName(String username) {
        LambdaQueryWrapper<UserDao> wrapper = new LambdaQueryWrapper<UserDao>();
        wrapper.eq(UserDao::getAccount, username);
        wrapper.orderByDesc(UserDao::getId);
        return Optional.ofNullable(this.getOne(wrapper));
    }

    public boolean updatePasswd(UserDao user) {
        Assert.notNull(user.getId());
        return this.updateById(user);
    }

    public boolean updateRole(Long userId, List<Integer> roleIds) {
        UserDao userDao = new UserDao();
        userDao.setId(userId);
        userDao.setRoleIds(UserDao.convertRoleList2Str(roleIds));
        return this.updateById(userDao);
    }
}
