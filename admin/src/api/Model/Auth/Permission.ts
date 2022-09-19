interface Permission {
    groupId: number;
    permission: string;
    permissionName: string;
    hasPermission?: boolean;
    disabled?: boolean;
}

export default Permission;