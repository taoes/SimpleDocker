package com.taoes.simpledocker.dao.responsity;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.taoes.simpledocker.dao.bean.PermissionDao;
import com.taoes.simpledocker.dao.mapper.PermissionMapper;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 21:43
 */
@Repository
public class PermissionRepository extends ServiceImpl<PermissionMapper, PermissionDao> {


    public List<PermissionDao> getByIds(Collection<Integer> ids) {
        if (CollUtil.isEmpty(ids)) {
            return Collections.emptyList();
        }
        return this.baseMapper.selectBatchIds(ids);
    }

    public List<PermissionDao> getByRoleId(Integer roleId) {
        LambdaQueryWrapper<PermissionDao> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PermissionDao::getRoleId, roleId);
        return this.baseMapper.selectList(wrapper);
    }

    public List<PermissionDao> getByRoleIds(Collection<Integer> roleIds) {
        if (CollUtil.isEmpty(roleIds)) {
            return Collections.emptyList();
        }
        LambdaQueryWrapper<PermissionDao> wrapper = new LambdaQueryWrapper<>();
        wrapper.in(PermissionDao::getRoleId, roleIds);
        return this.baseMapper.selectList(wrapper);
    }

    public boolean savePermission(Integer roleId, List<PermissionDao> permissions) {
        deleteByRoleId(roleId);
        if (CollUtil.isEmpty(permissions)) {
            return true;
        }
        return this.saveBatch(permissions);
    }

    public void deleteByRoleId(Integer roleId) {
        LambdaQueryWrapper<PermissionDao> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PermissionDao::getRoleId, roleId);
        this.baseMapper.delete(wrapper);
    }

}
