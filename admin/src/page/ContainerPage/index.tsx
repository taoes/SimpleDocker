import {Button, Drawer, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import dateToStr from "../../utils/Time";
import DockerContainer from "../../api/Model/DockerContainer";
import {getContainers} from "../../api/Container/ContainerApi";
import ContainerDetailDrawer from "../../component/App/Container/ContainerDetailDrawer";
import ContainerPort from "../../api/Model/ContainerPort";


export interface TagColor {
    color: String
    text: String
}

let getStatusInfo = function (State: string): TagColor {
    let color = 'blue'
    let text = '未知'
    if (State === 'running') {
        color = 'green'
        text = '运行'
    } else if (State === 'exited') {
        color = 'red'
        text = '退出'
    } else if (State === 'paused') {
        color = 'gold'
        text = '暂停'
    } else if (State === 'created') {
        color = 'purple'
        text = '创建'
    }
    return {color, text}
}


let portShow = (container: DockerContainer) => {
    return container.Ports.map((p:ContainerPort,index:number) => {
        if (!!p.IP) {
            return <Tag key={index}>{p.IP}:{p.PublicPort}-{p.PrivatePort}/{p.Type.toUpperCase()}</Tag>
        } else {
            return <Tag key={index}>{p.PrivatePort}/{p.Type.toUpperCase()}</Tag>
        }
    })
}

function ContainerPage() {

    function getOperatorInfo(State: String): any {
        return {operator: "RUN", name: "运行"}
    }

    function operatorContainer(operate: any, record: DockerContainer) {

    }

    function showMoreOperatorDrawer(record: DockerContainer) {

    }


    let columns: ColumnsType<DockerContainer> = [
        {
            title: '容器ID',
            dataIndex: 'Id',
            render: id => <span>{id && id.substring(0, 15)}</span>,
            ellipsis: true,
            width: 150,
            fixed: 'left'
        },
        {
            title: '容器名称',
            width: 200,
            render: (_, container: DockerContainer) => {
                return container.Names.map((name: string) => {
                    return <Tag key={name}>{name && name.substring(1)}</Tag>
                })

            },
            ellipsis: true,
        },
        {
            title: '镜像名',
            dataIndex: 'Image',
            render: Image => <span>{Image}</span>,
            ellipsis: true,
            width: 250,
        }, {
            title: '端口映射',
            dataIndex: 'Ports',
            render: (_: any, container: DockerContainer) => portShow(container),
            width: 400
        }, {
            title: '启动脚本',
            dataIndex: 'Command',
            render: Command => <span>{Command}</span>,
            width: 400
        },
        {
            title: '容器状态',
            dataIndex: 'State',
            render: State => {
                let tagColor: TagColor = getStatusInfo(State);
                return <span>{tagColor.text}</span>
            },
            width: 80,
        },
        {
            title: '创建时间',
            dataIndex: 'Created',
            width: 180,
            render: time => <span>{dateToStr(time * 1000)}</span>,
        },
        {
            title: '操作容器',
            dataIndex: '[State,Id]',
            fixed: 'right',
            width: 180,
            render: (text, record) => {
                let {operate, name} = getOperatorInfo(record.State);
                return <div style={{wordWrap: 'break-word', wordBreak: 'break-word'}}>
                    <Space>
                        <Button type="link" onClick={() => operatorContainer(operate, record)}size="small">{name}</Button>
                        <Button type="link" onClick={() => showDetail(record)} size="small">详情</Button>
                        <Button type="link" onClick={() => showMoreOperatorDrawer(record)} size="small">更多</Button>
                    </Space>
                </div>
            }
        },
    ];

    let hideDetail = () => {
        setDrawerStatus(false)
        setCurrentContainerId("")
    }

    let showDetail = (record: DockerContainer) => {
        setCurrentContainerId(record.Id)
        setDrawerStatus(true)
    }


    let [currentContainerId, setCurrentContainerId] = useState<string>("")
    let [drawerStatus, setDrawerStatus] = useState<boolean>(false)
    let [containers, setContainers] = useState<Array<DockerContainer>>([])
    useEffect(() => {
        getContainers().then(data => {
            setContainers(data)
        })
    }, [])


    return (
        <div id="imagePage" className={"box"}>
            <Table
                rowKey={record => record.Id}
                columns={columns} dataSource={containers}
                scroll={{x: 1000}}/>

            <Drawer title="容器详情"
                    destroyOnClose={true}
                    width={720}
                    onClose={hideDetail}
                    visible={drawerStatus}>
                <ContainerDetailDrawer containerId={currentContainerId}/>
            </Drawer>
        </div>
    )
}

export default ContainerPage;