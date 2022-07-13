package com.taoes.simpledocker.controller.request.role;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 22:40
 */
@Data
public class RoleUpdateRequest {

    @NotNull
    private Integer id;
    @NotBlank
    private String name;
    @NotBlank
    private String comment;
}
