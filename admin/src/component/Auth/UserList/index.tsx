import Search from "antd/es/input/Search";
import {Button, Form, Input, message, Modal, Select, Space, Table} from "antd";
import {CloudSyncOutlined, ReloadOutlined, DeleteOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import User from "../../../api/Model/User";
import React, {useEffect, useState} from "react";
import {userList, createNewUser} from "../../../api/User/UserApi";
import UserCreate from "../../../component/App/User/UserCreate";
import UserCreatedRequest from "../../../api/Model/Auth/UserCreatedRequest";
import Role from "../../../api/Model/Auth/Role";
import {roleList} from "../../../api/Auth/RoleApi";

const columns: ColumnsType<User> = [
    {
        title: '用户ID',
        dataIndex: 'id',
        render: id => <span>{id}</span>,
        ellipsis: true,
        width: 150,
    },
    {
        title: '用户名',
        dataIndex: 'account',
        render: account => <span>{account}</span>,
        ellipsis: true,
        width: 150,
    },
    {
        title: '角色',
        dataIndex: 'role',
        render: role => <span>ADMIN</span>,
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
    }, {
        title: '操作',
        dataIndex: 'address',
        fixed: 'right',
        width: 80,
        render: (_, user: User) => {
            return (
                <Space>
                    <Button size={"small"} danger icon={<DeleteOutlined/>}>删除</Button>
                    <Button size={"small"} icon={<UserSwitchOutlined/>}>角色</Button>
                </Space>
            )
        }

    }
]

interface Props {

}

interface State {
    users: Array<User>,
    modalOfCreateUser: boolean
}

export default class UserList extends React.Component<Props, State> {

    private newUserInfo: UserCreatedRequest = {name: '', account: '', roleIds: []}

    private roles: Array<Role> = []

    constructor(props: Props) {
        super(props);
        this.state = {
            users: [],
            modalOfCreateUser: false
        }
    }

    componentDidMount() {
        this.refresh(false);
        this.loadRoles();
    }

    loadRoles = () => {
        roleList(1, 100).then(resp => {
            if (resp.code !== 0) {
                message.error(`角色列表加载失败,${resp.msg}`).then();
                return
            }
            this.roles = resp.data.results;
        });
    }

    refresh = (fresh: boolean) => {
        if (fresh) {
            message.info("开始刷新用户列表中").then();
        }
        userList().then(resp => {
            if (resp.code !== 0) {
                message.error(`加载用户列表失败,${resp.msg}`).then();
                return
            }
            this.setState({users: resp.data})
        })
    }

    showCreateUserModal = () => {
        this.setState({modalOfCreateUser: true})
    }

    hideCreateUserModal = () => {
        this.setState({modalOfCreateUser: false})
    }

    createUser = () => {
        let info = this.newUserInfo;
        if (info.name === '' || info.account === '') {
            message.error(`创建用户失败,用户信息不完整`).then();
            return
        }
        createNewUser(info).then(resp => {
            if (resp.code !== 0) {
                message.error(`创建用户失败,${resp.msg}`).then();
                return
            }
            this.refresh(false)
            message.info(`创建用户成功`).then();
            this.hideCreateUserModal()
        })


    }

    createUserInfoChange = (_: any, value: UserCreatedRequest) => {
        this.newUserInfo = value
        console.log(this.newUserInfo)
    }

    render() {
        return (
            <div id="userPage" className={"box"}>
                <div>
                    <div className="imageController inline">
                        <Search placeholder="输入关键字以搜索镜像" style={{width: 400}}/>
                        <Button className="ml-2" onClick={() => this.refresh(true)}
                                icon={<ReloadOutlined/>}>刷新</Button>
                        <Button className="ml-2" onClick={() => this.showCreateUserModal()}
                                icon={<CloudSyncOutlined/>}>创建</Button>
                    </div>
                </div>
                <Table
                    size={"small"}
                    columns={columns}
                    dataSource={this.state.users}
                    scroll={{x: 1000}}
                    rowKey={record => record.id}/>

                <Modal title="创建新用户" visible={this.state.modalOfCreateUser}
                       onOk={() => this.createUser()}
                       onCancel={() => this.hideCreateUserModal()}>
                    <Form onValuesChange={this.createUserInfoChange}>
                        <Form.Item
                            label="账户名"
                            name="account"
                            rules={[{required: true, message: '请输入用户的账户名!'}]}
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            label="用户名称"
                            name="name"
                            rules={[{required: true, message: '请输入用户的姓名!'}]}
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            label="用户角色"
                            name="roleIds"
                            rules={[{required: true}]}
                        >
                            <Select  mode="multiple"  allowClear>
                                {
                                    this.roles.map(r => {
                                        return <Select.Option key={r.id}>{r.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}