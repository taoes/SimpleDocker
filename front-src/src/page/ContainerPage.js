import {Component} from "react";
import {Button, Checkbox, Divider, Input, Table, Tag} from "antd";
import {getContainerList} from "../api/ContainerApi";
import formateDate from '../utils/DateTime'

/**
 * 主页布局文件
 */
class ContainerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {containerList: []}

    }


    componentDidMount() {
        getContainerList().then(resp => {
            let containerList = resp.data
            console.log(containerList)
            this.setState({containerList})
        })
    }


    render() {
        const columns = [
            {
                title: '容器ID',
                dataIndex: 'Id',
                key: 'name',
                render: id => <span>{id.substring(0, 15)}</span>,
                ellipsis: true,
                width: 80,
            },
            {
                title: '容器名称',
                dataIndex: 'Names',
                key: 'Names',
                render: Names => {
                    let item = Names.map(name => {
                        return <Tag key={name}>{name}</Tag>
                    })
                    return item
                },
                ellipsis: true,
                width: 100,
            },
            {
                title: '镜像名',
                dataIndex: 'Image',
                render: Image => <span>{Image}</span>,
                key: 'Size',
                ellipsis: true,
                width: 120,
            },
            {
                title: '容器状态',
                dataIndex: 'State',
                render: State => {
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
                    }
                    return <Tag color={color}>{text}</Tag>
                },
                key: 'Size',
                width: 50,
            },
            {
                title: '创建时间',
                dataIndex: 'Created',
                key: 'Created',
                width: 80,
                render: time => <span>{formateDate(time * 1000)}</span>,
            },
            {
                title: '操作',
                dataIndex: 'operator',
                key: 'address 4',
                fixed: 'right',
                width: 80,
                render: () =>
                    <div>
                        <Button size="small" type="primary">运行</Button>
                        <Divider type="vertical"/>
                        <Button size="small" type="danger">删除</Button>
                        <Divider type="vertical"/>
                        <Button size="small">更多</Button>
                    </div>

            },
        ];

        return (
            <div>
                <div style={{margin: 10}}>
                    <Input placeholder="请输入过滤词" style={{width: 400}}/>
                    <Checkbox checked style={{marginLeft: 10}}>包含未运行容器</Checkbox>
                </div>
                <Table
                    bordered
                    pagination="bottomCenter"
                    columns={columns}
                    dataSource={this.state.containerList} size="small"/>
            </div>
        )

    }
}

export default ContainerPage;