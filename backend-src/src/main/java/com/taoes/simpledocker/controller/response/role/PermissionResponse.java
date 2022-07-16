package com.taoes.simpledocker.controller.response.role;

import com.taoes.simpledocker.model.enums.PermissionEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author manwang (569258yin)
 * @date 2022/7/16 8:25
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionResponse {

    private Integer groupId;
    private String permission;
    private String permissionName;


    public static PermissionResponse valueOf(PermissionEnum permissionEnum) {
        PermissionResponse permissionResponse = new PermissionResponse();
        permissionResponse.setGroupId(permissionEnum.getGroupId());
        permissionResponse.setPermission(permissionEnum.getPermission());
        permissionResponse.setPermissionName(permissionEnum.getDesc());
        return permissionResponse;
    }
}
