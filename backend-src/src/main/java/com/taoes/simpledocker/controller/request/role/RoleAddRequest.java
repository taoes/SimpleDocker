package com.taoes.simpledocker.controller.request.role;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 22:40
 */
@Data
public class RoleAddRequest {

    @NotBlank
    private String name;
    @NotBlank
    private String comment;
}
