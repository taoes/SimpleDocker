package com.taoes.simpledocker.controller.request.user;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author manwang (569258yin)
 * @date 2022/7/16 16:56
 */
@Data
public class UserAuthRoleRequest {
    @NotNull
    private Long userId;
    @NotNull
    private List<Integer> roleIds;
}
