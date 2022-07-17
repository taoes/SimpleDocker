package com.taoes.simpledocker.controller.response.role;

import cn.hutool.core.date.LocalDateTimeUtil;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.utils.TimeUtils;
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
  private String createdAt;
  private String updatedAt;

  public static RoleResponse factory(Role role) {
    RoleResponse roleResponse = new RoleResponse();
    roleResponse.setId(role.getId());
    roleResponse.setName(role.getName());
    roleResponse.setComment(role.getComment());
    roleResponse.setCreatedAt(TimeUtils.format(role.getCreatedAt()));
    roleResponse.setUpdatedAt(TimeUtils.format(role.getUpdatedAt()));
    return roleResponse;
  }
}
