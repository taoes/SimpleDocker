import type {DataNode} from 'antd/es/tree'

export default interface PermissionTree {
    selectPermissions: Array<string>,
    permissionTree: Array<DataNode>
}