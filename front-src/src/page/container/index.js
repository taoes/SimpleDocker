import {Component} from "react";
import {Button, Checkbox, Input, Space, Table, Tag, Modal, message, Menu, Dropdown} from "antd";
import {getContainerList, operatorContainerApi} from "../../api/container";
import formateDate from '../../utils/DateTime'
import {
    DeleteOutlined,
    ExportOutlined,
    InfoCircleOutlined,
    ReloadOutlined,
    PauseOutlined,
    CopyOutlined
} from "@ant-design/icons";


import domain from "../../config/config"

const {operatorMap} = require('../../config/containerStatus')

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
        this.confirm = Modal.confirm
        this.showContainerLog = this.showContainerLog.bind(this)
    }


    componentDidMount() {
        this.refreshList()
    }

    refreshList = function () {
        getContainerList().then(resp => {
            let containerList = resp.data
            this.setState({containerList})
            message.info("加载容器列表完成")
        })
    }


    //  显示容器日志Modal
    showContainerLog = function (cId) {
        this.setState({logModalVisible: true})
        let ws = new WebSocket(`${domain.ws}/ws/container/${cId}/log`)
        this.ws = ws
        let that = this
        ws.onopen = function () {
            let records = that.state.logRecord;
            that.setState({logRecord: [...records, "连接WS服务成功,正在加载日志...."]})
        }
        ws.onmessage = function (e) {
            let records = that.state.logRecord;
            that.setState({logRecord: [...records, e.data]})
        }
        ws.onclose = function (e) {
            let records = that.state.logRecord;
            that.setState({logRecord: [...records, `连接WS服务已关闭`]})
        }
        ws.onerror = function (e) {
            let records = that.state.logRecord;
            that.setState({logRecord: [...records, `连接WS服务失败,${JSON.stringify(e)}`]})
        }
    }

    //  关闭容器日志Modal
    closeContainerLogModal = () => {
        this.setState({logModalVisible: false, logRecord: []})
        // 关闭WS 连接
        if (this.ws !== null) {
            this.ws.close()
        }
    }

    // 根据状态值判断类型
    getStatusInfo = function (State) {
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

    // 获取操作的按钮
    getOperatorInfo = function (State) {
        switch (State) {
            case 'running':
                return {name: '停止', operate: 'STOP'}
            case 'paused':
                return {name: '继续', operate: 'UNPAUSE'}
            default:
                return {name: '启动', operate: 'START'}
        }
    }

    // 操作容器
    operatorContainer = function (operator, container) {
        let {Id} = container;
        let key = `${operator}-${Id}`
        message.loading({content: `正在${operatorMap.get(operator)}容器,请稍后`, key});

        // 操作成功的响应
        let then = (resp) => {
            message.info({content: `${operatorMap.get(operator)}容器完成!`, key, duration: 3})
            this.refreshList()
        }

        // 操作失败的响应
        let error = (error) => {
            message.error({content: `${operatorMap.get(operator)}容器失败,错误信息:${JSON.stringify(error)}`, key, duration: 3})
            this.refreshList()
        }

        operatorContainerApi(Id, operator, {}, then, error)
    }


    render() {
        // 下拉菜单
        let that = this
        const menu = function (container) {
            let disabled = container.State !== 'running';
            return <Menu>
                <Menu.Item icon={<InfoCircleOutlined/>} onClick={() => message.warning("正在开发中，敬请期待")}>
                    详情信息
                </Menu.Item>

                <Menu.Item icon={<PauseOutlined/>} onClick={() => that.operatorContainer('PAUSE', container)}
                           disabled={disabled}>
                    暂停容器
                </Menu.Item>

                <Menu.Item icon={<CopyOutlined/>} onClick={() => message.warning("暂未实现")}>
                    复制容器
                </Menu.Item>

                <Menu.Item icon={<ExportOutlined/>} onClick={() => message.warning("暂未实现")}>
                    导出容器
                </Menu.Item>

                <Menu.Item icon={<DeleteOutlined/>} onClick={() => that.operatorContainer('REMOVE', container)} danger>
                    删除容器
                </Menu.Item>

                <Menu.Item icon={<DeleteOutlined/>} onClick={() => that.operatorContainer('REMOVE', container)} danger>
                    连接网络
                </Menu.Item>
            </Menu>
        }

        const columns = [
            {
                title: 'ID',
                dataIndex: 'Id',
                key: 'id',
                render: id => <span>{id && id.substring(0, 15)}</span>,
                ellipsis: true,
                width: 80,
            },
            {
                title: '名称',
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
                title: '状态',
                dataIndex: 'State',
                render: State => {
                    let {color, text} = this.getStatusInfo(State)
                    return <span style={{color: color}}>{text}</span>
                },
                key: 'Size',
                width: 30,
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
                render: (text, record) => {
                    let {operate, name} = this.getOperatorInfo(record.State);
                    return <div>
                        <Space>
                            <Button size="small" type="link"
                                    onClick={() => this.operatorContainer(operate, record)}>{name}</Button>
                            <Button size="small" type="link"
                                    onClick={() => this.showContainerLog(record.Id)}>日志</Button>
                            <Dropdown overlay={() => menu(record)} arrow>
                                <Button type="link" size="small">更多</Button>
                            </Dropdown>
                        </Space>
                    </div>
                }
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
                <Space>
                    <Button type="primary" icon={<ReloadOutlined/>} onClick={() => this.refreshList()}>刷新</Button>
                    <Input placeholder="请输入过滤词" style={{width: 400}} allowClear
                           onChange={(e) => this.setState({filterKey: e.target.value})}/>
                    <Checkbox checked style={{marginLeft: 10}}>包含未运行容器</Checkbox>
                </Space>
                <div style={{height: 10}}/>
                <Table
                    bordered
                    pagination="bottomCenter"
                    columns={columns}
                    size="small"
                    dataSource={containerListOfFilter}/>
                <Modal
                    visible={this.state.logModalVisible}
                    width={1000}
                    closable={false}
                    okText="确定"
                    cancelText="导出"
                    onOk={this.closeContainerLogModal}>
                    {
                        <div style={{width: '1000px', height: '500px', overflow: 'scroll', padding: 10}}>
                            {
                                this.state.logRecord.map(
                                    log => <span key={log} style={{whiteSpace: 'nowrap', display: 'block'}}>{log}</span>
                                )
                            }
                        </div>
                    }
                </Modal>
            </div>
        )

    }
}

export default ContainerPage;
