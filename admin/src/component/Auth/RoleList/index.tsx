import React from "react";
import Role from "../../../api/Model/Auth/Role";
import {createNewRole, deleteRole, getPermissionGroup, roleList} from "../../../api/Auth/RoleApi";
import {Button, Checkbox, Form, Input, message, Modal, Space, Table, Tabs} from "antd";
import {ColumnsType} from "antd/es/table";
import {ReloadOutlined, CloudSyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import Search from "antd/es/input/Search";
import RoleCreatedRequest from "../../../api/Model/Auth/RoleCreatedRequest";
import PermissionGroup from "../../../api/Model/Auth/PermissionGroup";
import './index.css'

interface Props {

}

interface State {
    roleList: Array<Role>,
    modalForCreateRole: boolean,
    modalForPermission: boolean,
    currentRoleId: number,
    newRoleReq: RoleCreatedRequest,
    permissionConfig: Array<PermissionGroup>
}

const {confirm} = Modal;

export default class RoleList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            modalForCreateRole: false,
            modalForPermission: false,
            roleList: [],
            permissionConfig: [],
            currentRoleId: 0,
            newRoleReq: {name: '', comment: ''}
        }
    }

    componentDidMount() {
        this.refresh()
    }


    /**
     * 刷新列表
     */
    refresh = () => {
        roleList(1, 100).then(resp => {
            let {code, msg, data} = resp;
            if (code !== 0) {
                message.error(`加载角色列表失败:${msg}`).then();
                return
            }
            this.setState({roleList: data.results})
        })

        getPermissionGroup().then(resp => {
            if (resp.code === 0) {
                this.setState({permissionConfig: resp.data})
            }
        });
    }


    /**
     * 保存角色
     */
    saveRole = () => {
        // 检查数据
        let data = this.state.newRoleReq;
        if (data.name?.trim() === '' || data.comment?.trim() === '') {
            message.error(`创建失败，角色信息不能为空`)
            return
        }
        createNewRole(data).then(resp => {
            let {code, msg} = resp;
            if (code !== 0) {
                message.info(`创建失败，${msg}`);
                return
            }
            message.info(`创建成功，正在刷新角色列表`)
            this.setState({modalForCreateRole: false, newRoleReq: {name: '', comment: ''}})
            this.refresh()
        })
    }
    /**
     * 保存权限
     */
    savePermission = () => {
    }


    /***
     * 删除角色
     * @param role 需要删除的角色信息
     */
    deleteRole = (role: Role) => {
        let remove = () => {
            deleteRole(role.id).then(resp => {
                let {code, msg, data} = resp;
                if (code !== 0) {
                    message.error(`删除角色失败,${msg}`)
                    return
                }
                this.refresh()
            })
        }
        confirm({
            title: `是否确认删除角色${role.name}?`,
            icon: <ExclamationCircleOutlined/>,
            content: '此操作不可逆，请谨慎操作',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                remove()
            }
        });
    }

    updatePermission = (role: Role) => {
        this.setState({
            currentRoleId: role.id,
            modalForPermission: true
        })
    }

    onRoleChange = (_: any, value: RoleCreatedRequest) => {
        this.setState({newRoleReq: value})
    }

    render() {
        const columns: ColumnsType<Role> = [
            {
                title: '角色ID',
                dataIndex: 'id',
                render: id => <span>{id}</span>,
                ellipsis: true,
                width: 150,
            },
            {
                title: '角色名称',
                dataIndex: 'name',
                render: name => <span>{name}</span>,
                ellipsis: true,
                width: 150,
            },
            {
                title: '角色描述',
                dataIndex: 'comment',
                render: comment => <span>{comment}</span>,
                ellipsis: true,
                width: 150,
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: createdAt => <span>{createdAt}</span>,
                ellipsis: true,
                width: 150,
            },
            {
                title: '更新时间',
                dataIndex: 'updatedAt',
                render: updatedAt => <span>{updatedAt}</span>,
                ellipsis: true,
                width: 150,
            },
            {
                title: '操作',
                dataIndex: 'id',
                fixed: 'right',
                width: 180,
                render: (_, role: Role) => {
                    return (
                        <Space>
                            <Button size={"small"} danger onClick={() => this.deleteRole(role)}>删除</Button>
                            <Button size={"small"}>禁用</Button>
                            <Button size={"small"} onClick={() => this.updatePermission(role)}>权限</Button>
                        </Space>
                    )
                }
            }
        ]

        return (
            <div id="authPageForRole" className={"box"}>
                <div>
                    <div className="imageController inline">
                        <Search placeholder="输入关键字以搜索镜像" style={{width: 400}}/>
                        <Button className="ml-2" onClick={() => this.refresh}
                                icon={<ReloadOutlined/>}>刷新</Button>
                        <Button className="ml-2" onClick={() => this.setState({modalForCreateRole: true})}
                                icon={<CloudSyncOutlined/>}>创建</Button>
                    </div>
                </div>
                <Table
                    size={"small"}
                    columns={columns}
                    dataSource={this.state.roleList}
                    scroll={{x: 1000}}
                    rowKey={record => record.id}/>

                <Modal title="创建新角色" visible={this.state.modalForCreateRole}
                       onOk={() => this.saveRole()}
                       onCancel={() => this.setState({modalForCreateRole: false})}>
                    <Form onValuesChange={this.onRoleChange}>
                        <Form.Item
                            label="角色名称"
                            name="name"
                            rules={[{required: true, message: '请输入角色名称!'}]}
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            label="角色描述"
                            name="comment"
                            rules={[{required: true, message: '请输入角色的描述信息!'}]}
                        >
                            <Input/>
                        </Form.Item>

                    </Form>
                </Modal>

                <div id={"rolePermissionConfigModal"}>
                    <Modal title="权限配置"
                           visible={this.state.modalForPermission}
                           onOk={() => this.savePermission()}
                           onCancel={() => this.setState({modalForPermission: false})}
                           footer={null}
                    >
                        <Tabs>
                            {
                                this.state.permissionConfig.map(group => {
                                    return <Tabs.TabPane tab={group.groupName} key={group.groupId}>
                                        {
                                            group.permissions.map(p => {
                                                return <Checkbox className={"m-1"}>{p.permissionName}</Checkbox>
                                            })
                                        }
                                    </Tabs.TabPane>
                                })
                            }
                        </Tabs>
                    </Modal>
                </div>
            </div>
        )
    }
}