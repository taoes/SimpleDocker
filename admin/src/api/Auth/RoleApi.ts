import httpRequest from '../Api'
import Role from "../Model/Auth/Role";
import {Base} from "../Base";
import {Page} from "../Page";
import RoleCreatedRequest from "../Model/Auth/RoleCreatedRequest";
import RoleUpdateRequest from "../Model/Auth/RoleUpdateRequest";
import PermissionGroup from "../Model/Auth/PermissionGroup";
import Permission from "../Model/Auth/Permission";
import type {DataNode} from 'antd/es/tree'
import PermissionTree from "../Model/Auth/PermissionTree";

/**
 * 获取角色列表
 */
function roleList(pageNum: number, pageSize: number): Promise<Base<Page<Role>>> {
    return httpRequest.get<Base<Page<Role>>>(`/role/list?pageNum=${pageNum}&pageSize=${pageSize}`).then(data => data.data)
}

/**
 * 创建新的角色
 */
function createNewRole(req: RoleCreatedRequest): Promise<Base<Boolean>> {
    return httpRequest.post<Base<Boolean>>(`/role`, req).then(data => data.data)
}

/**
 * 更新角色信息
 */
function updateRole(req: RoleUpdateRequest): Promise<Base<Boolean>> {
    return httpRequest.put<Base<Boolean>>(`/role`, req).then(data => data.data);
}

/**
 * 删除角色
 */
function deleteRole(id: number): Promise<Base<Boolean>> {
    return httpRequest.delete<Base<Boolean>>(`/role?id=${id}`).then(data => data.data);
}

/**
 * 查询角色的权限树
 * @param id
 */
function getPermissionOfRole(id: number): Promise<Base<PermissionTree>> {
    return httpRequest.get<Base<PermissionTree>>(`/role/permission/${id}/tree`).then(data => data.data);
}

function saveRolePermission(roleId: number, permissions: Array<string>): Promise<Base<Boolean>> {
    return httpRequest.post(`/role/permission`, {roleId, permissions}).then(data => data.data);
}

export {roleList, createNewRole, updateRole, deleteRole, getPermissionOfRole, saveRolePermission}