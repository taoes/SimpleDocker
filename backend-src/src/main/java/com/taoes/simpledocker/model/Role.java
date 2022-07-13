package com.taoes.simpledocker.model;

import cn.hutool.core.collection.CollUtil;
import com.taoes.simpledocker.dao.bean.PermissionDao;
import com.taoes.simpledocker.dao.bean.RoleDao;
import com.taoes.simpledocker.model.enums.PermissionEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 角色领域模型
 *
 * @author manwang (569258yin)
 * @date 2022/7/13 21:55
 */
@Data
@NoArgsConstructor
public class Role {

    public static final String ADMIN_ROLE_NAME = "admin";

    private Integer id;
    private String name;
    private String comment;
    private List<PermissionEnum> permissions;


    public RoleDao convertRoleDao() {
        RoleDao roleDao = new RoleDao();
        roleDao.setId(this.id);
        roleDao.setComment(this.comment);
        roleDao.setName(this.name);
        return roleDao;
    }

    public static Role factoryRole(RoleDao roleDao) {
        Role role = new Role();
        role.setId(roleDao.getId());
        role.setName(roleDao.getName());
        role.setComment(roleDao.getComment());
        role.setPermissions(Collections.emptyList());
        return role;
    }

    public static Role factoryRole(RoleDao roleDao, List<PermissionDao> permissions) {
        Role role = new Role();
        role.setId(roleDao.getId());
        role.setName(roleDao.getName());
        role.setComment(roleDao.getComment());
        role.setPermissions(convertPermission2Enum(permissions));
        return role;
    }

    public static List<Role> factoryRoles(List<RoleDao> roleDaoList, List<PermissionDao> permissionDaoList) {
        Map<Integer, List<PermissionDao>> groupByRoleIdMap = permissionDaoList.stream().collect(Collectors.groupingBy(PermissionDao::getRoleId));
        return roleDaoList.stream().map(r -> factoryRole(r, groupByRoleIdMap.get(r))).collect(Collectors.toList());
    }

    public static List<PermissionEnum> convertPermission2Enum(List<PermissionDao> permissions) {
        if (CollUtil.isEmpty(permissions)) {
            return Collections.emptyList();
        }
        return permissions.stream().map(r -> PermissionEnum.getPermissionEnum(r.getPermission())).collect(Collectors.toList());
    }

    public static List<String> getAllPermissions(List<Role> roles) {
        if (CollUtil.isEmpty(roles)) {
            return Collections.emptyList();
        }
        return roles.stream().flatMap(r -> r.getPermissions().stream().map(PermissionEnum::getPermission)).distinct().collect(Collectors.toList());
    }
}
