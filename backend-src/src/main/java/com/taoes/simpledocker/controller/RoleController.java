package com.taoes.simpledocker.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.hutool.core.collection.CollUtil;
import com.google.common.collect.Lists;
import com.taoes.simpledocker.controller.request.role.RoleAddRequest;
import com.taoes.simpledocker.controller.request.role.RolePermissionSaveRequest;
import com.taoes.simpledocker.controller.request.role.RoleUpdateRequest;
import com.taoes.simpledocker.controller.response.role.PermissionGroupResponse;
import com.taoes.simpledocker.controller.response.role.PermissionResponse;
import com.taoes.simpledocker.controller.response.role.RoleResponse;
import com.taoes.simpledocker.model.PageModel;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.model.enums.PermissionEnum;
import com.taoes.simpledocker.model.enums.PermissionGroupEnum;
import com.taoes.simpledocker.model.exception.DataNotFoundException;
import com.taoes.simpledocker.service.RoleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 22:38
 */
@Api(tags = "角色管理")
@RestController
@RequestMapping("api/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @ApiOperation("分页查询角色信息")
    @SaCheckPermission(value = "role:query", orRole = Role.ADMIN_ROLE_NAME)
    @GetMapping("list")
    public ResponseModel<PageModel<RoleResponse>> list(@Validated @NotNull @Min(1) @RequestParam("pageNum") Integer pageNum,
                                                       @NotNull @Min(1) @Max(100) @RequestParam("pageSize") Integer pageSize) {
        PageModel<Role> pageModel = roleService.pageList(pageNum, pageSize);
        PageModel<RoleResponse> pageResponse = PageModel.convertResultObj(pageModel, RoleResponse::factory);
        return ResponseModel.ok(pageResponse);
    }

    @ApiOperation("新增角色")
    @SaCheckPermission(value = "role:add", orRole = Role.ADMIN_ROLE_NAME)
    @PostMapping()
    public ResponseModel<Boolean> addRole(@Validated @RequestBody RoleAddRequest request) {
        Role role = new Role();
        role.setName(request.getName());
        role.setComment(request.getComment());
        roleService.addRole(role);
        return ResponseModel.ok(true);
    }

    @ApiOperation("修改角色信息")
    @SaCheckPermission(value = "role:update", orRole = Role.ADMIN_ROLE_NAME)
    @PutMapping()
    public ResponseModel<Boolean> updateRole(@Validated @RequestBody RoleUpdateRequest request) {
        Role role = new Role();
        role.setId(request.getId());
        role.setName(request.getName());
        role.setComment(request.getComment());
        roleService.updateRole(role);
        return ResponseModel.ok(true);
    }

    @ApiOperation("删除角色信息")
    @SaCheckPermission(value = "role:delete", orRole = Role.ADMIN_ROLE_NAME)
    @DeleteMapping
    public ResponseModel<Boolean> deleteRole(@Validated @NotNull @Min(1) @RequestParam("id") Integer id) {
        roleService.deleteRole(id);
        return ResponseModel.ok(true);
    }

    @ApiOperation("获取权限配置列表")
    @GetMapping("/permission/config")
    public ResponseModel<List<PermissionGroupResponse>> getPermissionConfig() {
        Map<Integer, List<PermissionEnum>> groupPermissionMap = PermissionEnum.getGroupPermission();
        List<PermissionGroupResponse> responses = Lists.newArrayListWithCapacity(groupPermissionMap.size());
        groupPermissionMap.forEach((groupId, list) -> {
            PermissionGroupEnum groupEnum = PermissionGroupEnum.getPermissionGroup(groupId);
            if (groupEnum != PermissionGroupEnum.ADMIN) {
                responses.add(PermissionGroupResponse.valueOf(groupEnum, list));
            }
        });
        return ResponseModel.ok(responses);
    }


    @ApiOperation("获取当前角色下已配置的权限")
    @SaCheckPermission(value = "role:permission:query", orRole = Role.ADMIN_ROLE_NAME)
    @GetMapping("/permission/{id}")
    public ResponseModel<List<PermissionResponse>> getPermissionByRoleId(@PathVariable("id") Integer id) {
        Role role = roleService.getById(id);
        if (role == null) {
            throw new DataNotFoundException("角色不存在或已删除");
        }
        if (CollUtil.isEmpty(role.getPermissions())) {
            return ResponseModel.ok(Collections.emptyList());
        }
        return ResponseModel.ok(
                role.getPermissions().stream().map(PermissionResponse::valueOf).collect(Collectors.toList())
        );
    }

    @ApiOperation("变更角色权限")
    @SaCheckPermission(value = "role:permission:save", orRole = Role.ADMIN_ROLE_NAME)
    @PostMapping("/permission")
    public ResponseModel<Boolean> savePermission(@Validated @RequestBody RolePermissionSaveRequest request) {
        roleService.savePermission(request.getRoleId(), request.getPermissions());
        return ResponseModel.ok(true);
    }

}
