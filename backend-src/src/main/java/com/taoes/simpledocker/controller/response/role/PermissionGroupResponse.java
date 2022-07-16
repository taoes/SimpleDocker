package com.taoes.simpledocker.controller.response.role;

import com.taoes.simpledocker.model.enums.PermissionEnum;
import com.taoes.simpledocker.model.enums.PermissionGroupEnum;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author manwang (569258yin)
 * @date 2022/7/16 8:38
 */
@Data
public class PermissionGroupResponse {

    private Integer groupId;
    private String groupName;
    private List<PermissionResponse> permissions;


    public static PermissionGroupResponse valueOf(PermissionGroupEnum permissionGroup, List<PermissionEnum> permissions) {
        PermissionGroupResponse permissionGroupResponse = new PermissionGroupResponse();
        permissionGroupResponse.setGroupId(permissionGroup.getId());
        permissionGroupResponse.setGroupName(permissionGroup.getDesc());
        permissionGroupResponse.setPermissions(permissions.stream().map(PermissionResponse::valueOf).collect(Collectors.toList()));
        return permissionGroupResponse;
    }
}
