package com.taoes.simpledocker.service.imple;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.ObjectUtil;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.page.PageMethod;
import com.google.common.collect.Lists;
import com.taoes.simpledocker.controller.response.role.PermissionTreeResponse;
import com.taoes.simpledocker.controller.response.tree.DataNode;
import com.taoes.simpledocker.dao.bean.PermissionDao;
import com.taoes.simpledocker.dao.bean.RoleDao;
import com.taoes.simpledocker.dao.responsity.PermissionRepository;
import com.taoes.simpledocker.dao.responsity.RoleRepository;
import com.taoes.simpledocker.model.PageModel;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.model.enums.PermissionEnum;
import com.taoes.simpledocker.model.enums.PermissionGroupEnum;
import com.taoes.simpledocker.model.exception.DataNotFoundException;
import com.taoes.simpledocker.model.exception.OperateFailException;
import com.taoes.simpledocker.model.exception.ParamCheckException;
import com.taoes.simpledocker.service.RoleService;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 21:53
 */
@Slf4j
@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public PageModel<Role> pageList(Integer pageNum, Integer pageSize) {
        PageMethod.startPage(pageNum, pageSize);
        List<RoleDao> roleDaoList = roleRepository.getAll();
        PageInfo<RoleDao> pageInfo = new PageInfo<>(roleDaoList);
        return PageModel.valueOfByPageInfo(pageInfo, Role::factoryRole);
    }

    @Override
    public void addRole(Role role) {
        final RoleDao roleDao = roleRepository.findByName(role.getName());
        if (roleDao!=null && !roleDao.deleted()){
            log.warn("创建角色:{}失败,当前角色已存在",role.getName());
            throw new OperateFailException("角色已存在");
        }

        // 如果不存在，则直接新增
        boolean result = roleRepository.insertRole(role.convertRoleDao());
        if (!result) {
            throw new OperateFailException("保存角色失败");
        }
    }

    @Override
    public void updateRole(Role role) {
        Assert.notNull(role.getId(), "参数不正确");
        checkRole(role.getId());
        boolean result = roleRepository.updateRole(role.convertRoleDao());
        if (!result) {
            throw new OperateFailException("更新角色失败");
        }
    }

    @Override
    public void deleteRole(Integer id) {
        checkRole(id);
        boolean result = roleRepository.deleteRole(id);
        if (!result) {
            throw new OperateFailException("删除角色失败");
        }
    }

    @Override
    public Role getById(Integer id) {
        RoleDao roleDao = roleRepository.getById(id);
        if (ObjectUtil.isEmpty(roleDao)) {
            return null;
        }
        List<PermissionDao> permissionDaoList = permissionRepository.getByRoleId(id);
        return Role.factoryRole(roleDao, permissionDaoList);
    }

    @Override
    public List<Role> getByIds(List<Integer> ids) {
        List<RoleDao> roleDaoList = roleRepository.getByIds(ids);
        if (CollUtil.isEmpty(roleDaoList)) {
            return Collections.emptyList();
        }
        List<Integer> dbRoleIds = roleDaoList.stream().map(RoleDao::getId).collect(Collectors.toList());
        List<PermissionDao> permissionDaoList = permissionRepository.getByRoleIds(dbRoleIds);
        return Role.factoryRoles(roleDaoList, permissionDaoList);
    }

    @Override
    public void savePermission(Integer roleId, List<String> permissions) {
        checkRole(roleId);
        for (String permission : permissions) {
            if (NumberUtil.isInteger(permission)){
                continue;
            }
            PermissionEnum.getPermissionEnum(permission);
        }
        List<PermissionDao> permissionDaoList = Lists.newArrayListWithCapacity(permissions.size());
        for (String permission : permissions) {
            if (NumberUtil.isInteger(permission)){
                continue;
            }
            permissionDaoList.add(new PermissionDao(roleId, permission));
        }
        boolean result = permissionRepository.savePermission(roleId, permissionDaoList);
        if (!result) {
            throw new OperateFailException("更新角色权限失败");
        }
    }

    @Override
    public PermissionTreeResponse createPermissionTree(Integer id) {
        Role role = this.getById(id);
        if (role == null) {
            throw new DataNotFoundException("角色不存在或已删除");
        }

        // 构建权限树
        final List<DataNode> nodes = new ArrayList<>();
        Map<Integer, List<PermissionEnum>> groupPermissionMap = PermissionEnum.getGroupPermission();
        groupPermissionMap.forEach((groupId, list) -> {
            PermissionGroupEnum groupEnum = PermissionGroupEnum.getPermissionGroup(groupId);
            final DataNode dataNode = new DataNode();
            dataNode.setDisabled(Objects.equals(role.getName(),Role.ADMIN_ROLE_NAME));
            dataNode.setKey(groupId.toString());
            dataNode.setTitle(groupEnum.getDesc());
            dataNode.setSelectable(Objects.equals(role.getName(),Role.ADMIN_ROLE_NAME));

            List<DataNode> children = new ArrayList<>();
            for (PermissionEnum permissionEnum : list) {
                DataNode node = new DataNode();
                node.setKey(permissionEnum.getPermission());
                node.setTitle(permissionEnum.getDesc());
                node.setSelectable(Objects.equals(role.getName(),Role.ADMIN_ROLE_NAME));
                node.setDisabled(Objects.equals(role.getName(),Role.ADMIN_ROLE_NAME));
                children.add(node);
            }
            dataNode.setChildren(children);
            nodes.add(dataNode);
        });

        if (CollUtil.isEmpty(role.getPermissions())) {
            return new PermissionTreeResponse(Collections.emptyList(),nodes);
        }

        final Set<String> selectedPermission = role.getPermissions().stream()
            .map(PermissionEnum::getPermission).collect(Collectors.toSet());

        return new PermissionTreeResponse(selectedPermission,nodes);
    }

    private void checkRole(Integer id) {
        RoleDao roleDao = roleRepository.getById(id);
        if (roleDao == null) {
            throw new DataNotFoundException("数据不存在或已删除");
        }
        if (roleDao.getName().equals(Role.ADMIN_ROLE_NAME)) {
            throw new ParamCheckException("超级管理员不能修改");
        }
    }
}
