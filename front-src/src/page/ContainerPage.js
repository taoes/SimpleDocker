import { Component } from "react";
import { Button, Checkbox, Divider, Input, message, Table, Tag } from "antd";
import { getContainerList } from "../api/ContainerApi";
import formateDate from '../utils/DateTime'
import Modal from "antd/lib/modal/Modal";
import { CiOutlined } from "@ant-design/icons";

/**
 * 主页布局文件
 */
class ContainerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            containerList: [],
            logModalVisible: false,
            logRecord: [],
            filterKey: ''
        }
        this.ws = null
        this.showContainerLog = this.showContainerLog.bind(this)
    }


    componentDidMount() {
        getContainerList().then(resp => {
            let containerList = resp.data
            console.log(containerList)
            this.setState({ containerList })
        })
    }


    //  显示容器日志Modal
    showContainerLog = function(cId){
        this.setState({ logModalVisible: true })
        // 开启WS连接
        var ws = new WebSocket(`ws://localhost:3364/ws/container/${cId}/log`)
        this.ws = ws
        let that = this
        ws.onopen = function () {
            let records = that.state.logRecord;
            that.setState({ logRecord: [...records, "连接WS服务成功,正在加载日志...."] })
        }
        ws.onmessage = function (e) {
            let records = that.state.logRecord;
            that.setState({ logRecord: [...records, e.data] })
        }
        ws.onclose = function (e) {
            let records = that.state.logRecord;
            that.setState({ logRecord: [...records, `连接WS服务已关闭`] })
        }
        ws.onerror = function (e) {
            let records = that.state.logRecord;
            that.setState({ logRecord: [...records, `连接WS服务失败,${JSON.stringify(e)}`] })
        }
    }

    //  关闭容器日志Modal
    closeContainerLogModal = () => {
        this.setState({ logModalVisible: false, logRecord: [] })
        // 关闭WS 连接
        if (this.ws !== null) {
            this.ws.close()
        
        }
    }



    render() {
        const columns = [
            {
                title: '容器ID',
                dataIndex: 'Id',
                key: 'id',
                render: id => <span>{id && id.substring(0, 15)}</span>,
                ellipsis: true,
                width: 80,
            },
            {
                title: '容器名称',
                dataIndex: 'Names',
                key: 'Names',
                render: Names => {
                    let item = Names.map(name => {
                        return <Tag key={name} color='green'>{name && name.substring(1)}</Tag>
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
                    } else if (State === 'created') {
                        color = 'purple'
                        text = '创建'
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
                dataIndex: '[State,Id]',
                key: 'address 4',
                fixed: 'staye',
                width: 80,
                render: (text, record) =>
                    <div>
                        <Button size="small" type="link" onClick={()=>this.showContainerLog(record.Id)}>日志</Button>
                        <Divider type="vertical" />
                        <Button size="small" type="link">删除</Button>
                        <Divider type="vertical" />
                        <Button type="link">更多</Button>
                    </div>

            },
        ];

        let containerListOfFilter = this.state.containerList.filter(container => {
            if (!this.state.filterKey) {
                return true
            }
            return container.Id.indexOf(this.state.filterKey) !== -1
                || container.State.indexOf(this.state.filterKey) !== -1
                || container.Image.indexOf(this.state.filterKey) !== -1
                || (JSON.stringify(container.Names).indexOf(this.state.filterKey) !== -1)

                ;
        });

        return (
            <div>
                <div style={{ margin: 10 }}>
                    <Input placeholder="请输入过滤词" style={{ width: 400 }} allowClear onChange={(e) => this.setState({ filterKey: e.target.value })} />
                    <Checkbox checked style={{ marginLeft: 10 }}>包含未运行容器</Checkbox>
                </div>
                <Table
                    bordered
                    pagination="bottomCenter"
                    columns={columns}
                    dataSource={containerListOfFilter} size="small" />
                <Modal
                    visible={this.state.logModalVisible}
                    width={1000}
                    closable={false}
                    okText="确定"
                    cancelText="导出"
                    onOk={this.closeContainerLogModal}>
                    {
                        <div style={{ width: '1000px', height: '500px', overflow: 'scroll', padding: 10 }}>
                            {this.state.logRecord.map(log => <span key={log} style={{ whiteSpace: 'nowrap', display: 'block' }}>{log}</span>)}
                        </div>
                    }
                </Modal>
            </div>
        )

    }
}

export default ContainerPage;