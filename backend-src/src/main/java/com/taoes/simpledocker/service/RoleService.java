package com.taoes.simpledocker.service;

import com.taoes.simpledocker.model.PageModel;
import com.taoes.simpledocker.model.Role;

import java.util.List;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 21:53
 */
public interface RoleService {

    PageModel<Role> pageList(Integer pageNum, Integer pageSize);

    void addRole(Role role);

    void updateRole(Role role);

    void deleteRole(Integer id);

    Role getById(Integer id);

    List<Role> getByIds(List<Integer> ids);


    void savePermission(Integer roleId, List<String> permissions);
}
