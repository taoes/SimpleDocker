import Permission from "./Permission";

interface PermissionGroup {
    groupId: number;
    groupName: string;
    permissions: Array<Permission>;
}

export default PermissionGroup;