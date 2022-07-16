import httpRequest from '../Api'
import DockerContainer from "../Model/DockerContainer";
import UserLoginRequest from "../Model/Auth/UserLoginRequest";
import Role from "../Model/Auth/Role";
import {Base} from "../Base";
import {Page} from "../Page";
import RoleCreatedRequest from "../Model/Auth/RoleCreatedRequest";
import RoleUpdateRequest from "../Model/Auth/RoleUpdateRequest";
import PermissionGroup from "../Model/Auth/PermissionGroup";

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
 * 获取权限组配置
 */
function getPermissionGroup(): Promise<Base<Array<PermissionGroup>>> {
    return httpRequest.get<Base<Array<PermissionGroup>>>('/role/permission/config').then(data => data.data);
}

export {roleList, createNewRole, updateRole, deleteRole,getPermissionGroup}