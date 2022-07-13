package com.taoes.simpledocker.model.enums;

import com.taoes.simpledocker.model.exception.ParamCheckException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 21:57
 */
@AllArgsConstructor
@Getter
public enum PermissionEnum {

    ADMIN(PermissionGroupEnum.ADMIN.getId(), "*", "超级管理员"),

    DOCKER_ENDPOINT_ADD(PermissionGroupEnum.DOCKER_ENDPOINT.getId(), "docker:endpoint:create", "新增docker节点"),
    DOCKER_ENDPOINT_UPDATE(PermissionGroupEnum.DOCKER_ENDPOINT.getId(), "docker:endpoint:update", "修改docker节点"),
    DOCKER_ENDPOINT_DELETE(PermissionGroupEnum.DOCKER_ENDPOINT.getId(), "docker:endpoint:delete", "删除docker节点"),
    DOCKER_ENDPOINT_QUERY(PermissionGroupEnum.DOCKER_ENDPOINT.getId(), "docker:endpoint:query", "查看docker节点"),

    USER_ADD(PermissionGroupEnum.USER.getId(), "user:add", "新增用户"),
    USER_UPDATE(PermissionGroupEnum.USER.getId(), "user:update", "修改用户"),
    USER_DELETE(PermissionGroupEnum.USER.getId(), "user:delete", "删除用户"),
    USER_QUERY(PermissionGroupEnum.USER.getId(), "user:query", "查看用户"),
    USER_AUTH_ROLE(PermissionGroupEnum.USER.getId(), "user:authRole", "编辑用户角色"),

    ROLE_ADD(PermissionGroupEnum.ROLE.getId(), "role:add", "新增角色信息"),
    ROLE_UPDATE(PermissionGroupEnum.ROLE.getId(), "role:update", "修改角色信息"),
    ROLE_DELETE(PermissionGroupEnum.ROLE.getId(), "role:delete", "删除角色信息"),
    ROLE_QUERY(PermissionGroupEnum.ROLE.getId(), "role:query", "查看角色信息"),
    ROLE_PERMISSION_QUERY(PermissionGroupEnum.ROLE.getId(), "role:permission:query", "查看角色权限"),
    ROLE_PERMISSION_SAVE(PermissionGroupEnum.ROLE.getId(), "role:permission:save", "修改角色权限"),
    ;

    private static final Map<String, PermissionEnum> INNER_MAP = new HashMap<>();

    static {
        for (PermissionEnum value : PermissionEnum.values()) {
            INNER_MAP.put(value.permission, value);
        }
    }

    private final Integer groupId;
    private final String permission;
    private final String desc;


    public static PermissionEnum getPermissionEnum(String permission) {
        PermissionEnum permissionEnum = INNER_MAP.get(permission);
        if (permissionEnum == null) {
            throw new ParamCheckException("权限不正确");
        }
        return permissionEnum;
    }

    public static Map<Integer, List<PermissionEnum>> getGroupPermission() {
        return INNER_MAP.values().stream().collect(Collectors.groupingBy(PermissionEnum::getGroupId));
    }

    @Override
    public String toString() {
        return this.permission;
    }
}
