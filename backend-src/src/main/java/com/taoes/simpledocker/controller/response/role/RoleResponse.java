package com.taoes.simpledocker.controller.response.role;

import com.taoes.simpledocker.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 22:46
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleResponse {

    private Integer id;
    private String name;
    private String comment;

    public static RoleResponse factory(Role role) {
        RoleResponse roleResponse = new RoleResponse();
        roleResponse.setId(role.getId());
        roleResponse.setName(role.getName());
        roleResponse.setComment(role.getComment());
        return roleResponse;
    }
}
