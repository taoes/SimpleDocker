package com.taoes.simpledocker.model.enums;

import com.taoes.simpledocker.model.exception.ParamCheckException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 21:57
 */
@AllArgsConstructor
@Getter
public enum PermissionGroupEnum {

    ADMIN(0, "超级管理员"),
    DOCKER_ENDPOINT(1, "容器资源"),
    USER(21, "用户"),
    ROLE(22, "角色"),
    ;

    private static final Map<Integer, PermissionGroupEnum> INNER_MAP = new HashMap<>();

    static {
        for (PermissionGroupEnum value : PermissionGroupEnum.values()) {
            INNER_MAP.put(value.id, value);
        }
    }

    private final Integer id;
    private final String desc;


    public static PermissionGroupEnum getPermissionGroup(Integer groupId) {
        PermissionGroupEnum permissionEnum = INNER_MAP.get(groupId);
        if (permissionEnum == null) {
            throw new ParamCheckException("权限分组不正确");
        }
        return permissionEnum;
    }

}
