package com.taoes.simpledocker.controller.request.role;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author manwang (569258yin)
 * @date 2022/7/16 8:59
 */
@Data
public class RolePermissionSaveRequest {

    @NotNull
    @Min(1)
    private Integer roleId;
    @NotNull
    private List<String> permissions;
}
