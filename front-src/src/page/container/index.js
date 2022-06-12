import {Component} from "react";
import {
  Button,
  Checkbox,
  Drawer,
  Input,
  message,
  Modal,
  Skeleton,
  Space,
  Table,
  Tag
} from "antd";
import {list} from "../../api/Container";
import dateToStr from '../../utils/DateTime'
import {ReloadOutlined,} from "@ant-design/icons";

import domain from "../../config/config"
import ContainerDetail from "../../components/container/detail";
import Index from "../../components/container/operator";

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
      filterKey: '',
      tableLoading: false,
      cDetailDrawer: false, // 容器详情Drawer状态
      moreDrawer: false,
      cId: null // 当前操作的容器ID
    }
    this.ws = null
    this.confirm = Modal.confirm
    this.showContainerLog = this.showContainerLog.bind(this)
  }

  componentDidMount() {
    this.refreshList()
  }

  // 刷新容器列表
  refreshList = () => {
    this.setState({tableLoading: true})
    list().then(resp => {
      let containerList = resp.data
      this.setState({containerList, tableLoading: false})
    }).catch(() => {
      message.info("容器列表加载失败，请稍后重试")
      this.setState({containerList: [], tableLoading: false})
    })
  }

  // 显示容器详情Modal
  showContainerModal = function (container) {
    let {Id} = container
    this.setState({cDetailDrawer: true, cId: Id});
  }

  // 显示更多操作的 drawer
  showMoreOperatorDrawer = function (container) {
    let {Id} = container
    this.setState({moreDrawer: true, cId: Id})
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
      color = 'grey'
      text = '暂停'
    } else if (State === 'created') {
      color = 'purple'
      text = '创建'
    }
    return {color, text}
  }

  // 获取操作的按钮
  getOperatorInfo = (State) => {
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
  operatorContainer = (operator, container) => {
    let {Id} = container;
    let key = `${operator}-${Id}`
    message.loading({content: `正在${operatorMap.get(operator)}容器,请稍后`, key});

    // 操作成功的响应
    let then = (resp) => {
      message.info(
          {content: `${operatorMap.get(operator)}容器完成!`, key, duration: 3})
      this.refreshList()
    }

    // 操作失败的响应
    let error = (error) => {
      message.error({
        content: `${operatorMap.get(operator)}容器失败,错误信息:${JSON.stringify(
            error)}`, key, duration: 3
      })
      this.refreshList()
    }

    operator(Id, operator, {}, then, error)
  }

  render() {
    // 下拉菜单
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
          return Names.map(name => {
            return <Tag key={name} color='green'>{name
                && name.substring(1)}</Tag>
          })
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
        render: time => <span>{dateToStr(time * 1000)}</span>,
      },
      {
        title: '操作',
        dataIndex: '[State,Id]',
        key: 'operator',
        fixed: 'left',
        width: 80,
        render: (text, record) => {
          let {operate, name} = this.getOperatorInfo(record.State);
          return <div>
            <Space>
              <Button type="link"
                      onClick={() => this.operatorContainer(operate, record)}
                      size="small">{name}</Button>
              <Button type="link"
                      onClick={() => this.showContainerModal(record)}
                      size="small">详情</Button>
              <Button type="link"
                      onClick={() => this.showMoreOperatorDrawer(record)}
                      size="small">更多</Button>
            </Space>
          </div>
        }
      },
    ];

    // 过滤容器
    let containerListOfFilter = this.state.containerList.filter(container => {
      if (!this.state.filterKey) {
        return true
      }
      return container.Id.indexOf(this.state.filterKey) !== -1
          || container.State.indexOf(this.state.filterKey) !== -1
          || container.Image.indexOf(this.state.filterKey) !== -1
          || (JSON.stringify(container.Names).indexOf(this.state.filterKey)
              !== -1);
    });

    return (
        <div>
          <Space>
            <Button type="primary" icon={<ReloadOutlined/>}
                    onClick={() => this.refreshList()}>刷新</Button>
            <Input placeholder="请输入过滤词"
                   id="containerFilterInput"
                   allowClear
                   onChange={(e) => this.setState(
                       {filterKey: e.target.value})}/>
            <Checkbox checked style={{marginLeft: 10}}>包含未运行容器</Checkbox>
          </Space>
          <div style={{height: 10}}/>

          <Skeleton loading={this.state.tableLoading} active>
            <Table
                bordered
                pagination="bottomCenter"
                columns={columns}
                size="small"
                dataSource={containerListOfFilter}/>
          </Skeleton>

          {/*容器日志Modal*/}
          <Modal
              visible={this.state.logModalVisible}
              width={800}
              closable={false}
              okText="确定"
              cancelText="导出"
              onOk={this.closeContainerLogModal}>
            {
              <div style={{
                width: 800,
                height: 500,
                overflow: 'scroll-auto',
                padding: 10
              }}>
                {
                  this.state.logRecord.map(
                      log => <span key={log} style={{
                        whiteSpace: 'nowrap',
                        display: 'block'
                      }}>{log}</span>
                  )
                }
              </div>
            }
          </Modal>

          {/*    容器详情Draw*/}
          <Drawer title="容器详情"
                  destroyOnClose={true}
                  width={500}
                  onClose={() => this.setState({cDetailDrawer: false})}
                  visible={this.state.cDetailDrawer}>
            <ContainerDetail containerId={this.state.cId}/>
          </Drawer>


          <Drawer title="更多操作"
                  destroyOnClose={true}
                  onClose={() => this.setState({moreDrawer: false})}
                  visible={this.state.moreDrawer}>
            <Index id={this.state.cId}/>
          </Drawer>
        </div>
    )

  }

}

export default ContainerPage;
