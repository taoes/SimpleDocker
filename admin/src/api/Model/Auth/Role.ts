/**
 * 角色信息定义
 */
export default interface Role {
    id: number;
    name: string;
    comment: string;
    permissions: Array<string>;
}