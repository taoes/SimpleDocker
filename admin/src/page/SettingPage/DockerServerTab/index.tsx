import {Button, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import DockerServer from "../../../api/Model/DockerServer";
import {useEffect, useState} from "react";


const columns: ColumnsType<DockerServer> = [
    {
        title: '容器ID',
        dataIndex: 'id',
        key: 'name',
        render: id => <span>{id}</span>,
        ellipsis: true,
        width: 150,
    },
    {
        title: '名称',
        dataIndex: 'name',
        render: (name) => <span>{name}</span>,
        key: 'name',
        width: 700,
    },
    {
        title: '类型',
        dataIndex: 'type',
        render: (type) => <span>{type}</span>,
        key: 'type',
        width: 120,
    }, {
        title: '状态',
        dataIndex: 'status',
        render: (status) => <span>{status}</span>,
        key: 'status',
        width: 120,
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        render: (createdAt) => <span>{createdAt}</span>,
    },
    {
        title: '操作',
        dataIndex: 'address',
        key: 'address 4',
        fixed: 'right',
        width: 180,
        render: (_, server: DockerServer) => {
            return (
                <Space>
                    <Button size="small" type="link">测试</Button>
                    <Button size="small" type="link">详情</Button>
                    <Button size="small" danger>禁用</Button>
                    <Button size="small" danger>删除</Button>
                </Space>
            )
        }

    },]


export default function DockerServerTab() {

    let initData: Array<DockerServer> = [
        {id: 1, name: '本地客户端', type: 'Local', status: '正常', createdAt: '2022-04-12'},
        {id: 2, name: '远程客户端1', type: 'Remote', status: '离线', createdAt: '2022-04-12'},
        {id: 3, name: '远程客户端2', type: 'Remote', status: '正常', createdAt: '2022-04-12'},
    ]

    let [servers, setServers] = useState<Array<DockerServer>>(initData)
    useEffect(() => {

    }, [])


    return (
        <div id="dockerServerTab">
            <Table className="mt-1 box" columns={columns} dataSource={servers} size={"small"}/>
        </div>
    )
}
