package com.taoes.simpledocker.dao.responsity;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.taoes.simpledocker.dao.bean.RoleDao;
import com.taoes.simpledocker.dao.mapper.RoleMapper;
import com.taoes.simpledocker.model.Role;
import io.netty.util.internal.StringUtil;
import java.util.Optional;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 21:41
 */
@Repository
public class RoleRepository extends ServiceImpl<RoleMapper, RoleDao> {


  public List<RoleDao> getAll() {
    LambdaQueryWrapper<RoleDao> wrapper = new LambdaQueryWrapper<>();
    return this.baseMapper.selectList(wrapper);
  }

  public boolean insertRole(RoleDao roleDao) {
    return this.baseMapper.insert(roleDao) > 0;
  }

  public boolean updateRole(RoleDao roleDao) {
    return this.baseMapper.updateById(roleDao) > 0;
  }

  public boolean deleteRole(Integer id) {
    return this.baseMapper.deleteById(id) > 0;
  }


  public List<RoleDao> getByIds(Collection<Integer> ids) {
    if (CollUtil.isEmpty(ids)) {
      return Collections.emptyList();
    }
    LambdaQueryWrapper<RoleDao> wrapper = new LambdaQueryWrapper<>();
    wrapper.in(RoleDao::getId, ids);
    return this.baseMapper.selectList(wrapper);
  }

  public RoleDao findByName(String name) {
    LambdaQueryWrapper<RoleDao> wrapper = new LambdaQueryWrapper<>();
    wrapper.eq(RoleDao::getName, name);
    return this.baseMapper.selectOne(wrapper);
  }
}
