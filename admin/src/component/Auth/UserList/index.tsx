import Search from "antd/es/input/Search";
import {Button, message, Modal, Space, Table} from "antd";
import {CloudSyncOutlined, ReloadOutlined,DeleteOutlined,UserSwitchOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import User from "../../../api/Model/User";
import {useEffect, useState} from "react";
import {userList} from "../../../api/User/UserApi";
import UserCreate from "../../../component/App/User/UserCreate";

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
                    <Button size={"small"} danger icon={<DeleteOutlined />}>删除</Button>
                    <Button size={"small"} icon={<UserSwitchOutlined />}>角色</Button>
                </Space>
            )
        }

    }
]

function UserList() {

    let [users, setUsers] = useState<Array<User>>([])

    let [createUserState, setCreateUserState] = useState<boolean>(false)
    useEffect(() => refresh(false), [])

    let refresh = (fresh: boolean) => {
        if (fresh) {
            message.info("开始刷新用户列表中").then();
        }
        userList().then(resp => {
            setUsers(resp.data)
        })
    }


    let createUser = () => {
        setCreateUserState(true)

    }
    return (
        <div id="userPage" className={"box"}>
            <div>
                <div className="imageController inline">
                    <Search placeholder="输入关键字以搜索镜像" style={{width: 400}}/>
                    <Button className="ml-2" onClick={() => refresh(true)}
                            icon={<ReloadOutlined/>}>刷新</Button>
                    <Button className="ml-2" onClick={() => createUser()}
                            icon={<CloudSyncOutlined/>}>创建</Button>
                </div>
            </div>
            <Table
                size={"small"}
                columns={columns}
                dataSource={users}
                scroll={{x: 1000}}
                rowKey={record => record.id}/>

            <Modal title="创建新用户" visible={createUserState} onOk={() => setCreateUserState(false)}
                   onCancel={() => setCreateUserState(false)}>
                <UserCreate/>
            </Modal>
        </div>
    )
}

export default UserList;