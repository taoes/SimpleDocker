import { Button, Drawer, message, Select, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dateToStr from "../../utils/Time";
import DockerContainer from "../../api/Model/DockerContainer";
import { getContainers, updateContainer } from "../../api/Container/ContainerApi";
import ContainerDetailDrawer from "../../component/App/Container/ContainerDetailDrawer";
import portShow from "./ports";
import Search from "antd/es/input/Search";
import { CloudSyncOutlined, ReloadOutlined } from "@ant-design/icons";
import React from "react";
import getStatusInfo from "./status";
import { NavigateFunction } from "react-router/lib/hooks";
import RouterInfo from "../../router/Router";
import WithRouter from "../../router/WithRouter";
import ContainerFileManagement from "../../component/App/Container/ContainerFileManagement";


/* 容器标识文案 */
export interface ContainerStateText {
  stateColor: string
  stateDesc: string
  operateCommon: string
  operateDesc: string
  operatorColor: string
}


interface Props {
  router: RouterInfo
}

interface State {
  currentContainerId: string,
  detailDrawerStatus: boolean,
  moreDrawerStatus: boolean,
  fmDrawerStatus: boolean,
  filterStates: Array<string>,
  containers: Array<DockerContainer>
}


class ContainerPage extends React.Component<Props, State> {
  private readonly navigate: NavigateFunction;

  constructor(props: Props) {
    super(props);
    this.navigate = props.router.navigate;
    this.state = {
      currentContainerId: '',
      detailDrawerStatus: false,
      moreDrawerStatus: false,
      fmDrawerStatus: false,
      containers: [],
      filterStates: []
    }
  }

  componentDidMount() {
    // 当组件挂载后，开始加载容器数据
    this.loadContainer()
  }

  // 操作容器
  operatorContainer = (operate: string, containerId: string | null) => {
    if (containerId == null) {
      containerId = this.state.currentContainerId
    }
    updateContainer(containerId, operate).then(() => {
      this.loadContainer()
    })
  }


  columns: ColumnsType<DockerContainer> = [
    {
      title: '容器ID',
      dataIndex: 'Id',
      render: id => <span>{id && id.substring(0, 15)}</span>,
      width: 180,
      fixed: 'left',
    },

    {
      title: '镜像名',
      dataIndex: 'Image',
      render: Image => <span>{Image}</span>,
      ellipsis: true,
      width: 150,
    },
    {
      title: '容器名称',
      render: (_, container: DockerContainer) => {
        return container.Names.map((name: string) => {
          return <span key={name}>{name && name.substring(1)}</span>
        })
      },
    },

    {
      title: '端口映射',
      dataIndex: 'Ports',
      render: (_: any, container: DockerContainer) => portShow(container)
    },
    {
      title: '容器状态',
      dataIndex: 'State',
      align: 'center',
      width: 100,
      render: (State) => {
        let statusInfo = getStatusInfo(State);
        return <span style={{ color: statusInfo.stateColor }}>{statusInfo.stateDesc}</span>
      }
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
      width: 240,
      render: (_, record) => {
        let { operateCommon, operateDesc, operatorColor } = getStatusInfo(record.State);
        return <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Space>
            <Button onClick={() => this.operatorContainer(operateCommon, record.Id)} size={"small"}
              style={{ color: operatorColor }}>{operateDesc}</Button>
            <Button onClick={() => this.navigateLogPage(record.Id)} size={"small"}>日志</Button>
            <Button onClick={() => this.showDetail(record)} size={"small"}>详情</Button>
            <Button onClick={() => this.showMoreOperatorDrawer(record)} size={"small"}>更多</Button>
          </Space>
        </div>
      }
    },
  ];

  // 隐藏详情
  hideDetail = () => {
    this.setState({
      detailDrawerStatus: false,
      currentContainerId: ''
    })

  }

  // 显示详情
  showDetail = (record: DockerContainer) => {
    this.setState({
      currentContainerId: record.Id,
      detailDrawerStatus: true
    })
  }

  // 隐藏文件管理器
  hideFm = () => {
    this.setState({ fmDrawerStatus: false })
  }

  showFm = () => {
    this.setState({ fmDrawerStatus: true })
  }

  // 显示更多
  showMoreOperatorDrawer = (record: DockerContainer) => {
    this.setState({
      currentContainerId: record.Id,
      moreDrawerStatus: true
    })
  }

  // 隐藏更多
  hideMoreOperatorDrawer = () => {
    this.setState({
      currentContainerId: '',
      moreDrawerStatus: false
    })
  }

  navigateLogPage = (containerId: string | null) => {
    if (containerId == null) {
      containerId = this.state.currentContainerId
    }
    this.navigate(`/app/container/${containerId}/log`)
  }


  update(operate: string) {
    this.setState({
      moreDrawerStatus: false
    })
    updateContainer(this.state.currentContainerId, operate).then(() => this.loadContainer())
  }


  loadContainer = () => {
    getContainers().then(resp => {
      if (resp.code !== 0) {
        message.error(`加载容器列表失败:${resp.msg}`).then();
        return
      }
      this.setState({ containers: resp.data })
    })
  }


  openTerminal = () => {
    let clientId = localStorage.getItem('clientId')
    this.navigate(`/terminal/container/${this.state.currentContainerId}/client/${clientId}`)
  }


  openContainerStat = ()=>{
    this.navigate(`/app/container/${this.state.currentContainerId}/stat`)
  }

  render() {
    return (
      <div id="imagePage" className={"box"}>
        <div className="is-flex">
          <div className="imageController mb-2">
            <Search placeholder="输入关键字已搜索容器" style={{ width: 400 }} />
            <Select defaultValue={[]} style={{ width: 400 }} className={"ml-1"} mode="multiple">
              <Select.Option value={"running"}>运行中</Select.Option>
              <Select.Option value={"created"}>已创建</Select.Option>
              <Select.Option value={"stop"}>已停止</Select.Option>
              <Select.Option value={"paused"}>暂停中</Select.Option>
            </Select>
            <Button onClick={() => this.loadContainer()} className="ml-2" icon={<ReloadOutlined />}>刷新</Button>
            <Button className="ml-2" icon={<CloudSyncOutlined />} danger>清理</Button>
          </div>
        </div>

        <Table
          size={"small"}
          rowKey={record => record.Id}
          rowSelection={{ fixed: 'left', type: 'checkbox' }}
          columns={this.columns} dataSource={this.state.containers}
          scroll={{ x: 1000 }} />

        <Drawer title="容器详情"
          destroyOnClose={true}
          width={"50%"}
          onClose={() => this.hideDetail()}
          visible={this.state.detailDrawerStatus}>
          <ContainerDetailDrawer containerId={this.state.currentContainerId} />
        </Drawer>


        <Drawer title="文件管理"
          destroyOnClose={true}
          width={"50%"}
          onClose={this.hideFm}
          visible={this.state.fmDrawerStatus}>
          <ContainerFileManagement containerId={this.state.currentContainerId} />
        </Drawer>



        <Drawer title="更多操作"
          destroyOnClose={true}
          width={350}
          onClose={() => this.hideMoreOperatorDrawer()}
          visible={this.state.moreDrawerStatus}>
          <div className={"flex"}>
            <Button className={"m-1"} type="ghost" onClick={this.openContainerStat}>容器监控</Button>
            <Button className={"m-1"} type="ghost" onClick={this.openTerminal}>容器终端</Button>
            <Button className={"m-1"} type="default" onClick={() => this.navigateLogPage(null)}>容器日志</Button>
            <Button className={"m-1"} type="default">容器网络</Button>
            <Button className={"m-1"} type="default" onClick={this.showFm}>文件管理</Button>
            <Button className={"m-1"} type="default" onClick={() => this.operatorContainer("PAUSE", null)}>暂停容器</Button>
            <Button className={"m-1"} type="default" onClick={() => this.operatorContainer("PAUSE", null)}>重命名容器</Button>
            <Button className={"m-1"} danger onClick={() => this.operatorContainer("REMOVE", null)}>移除容器</Button>
          </div>
        </Drawer>
      </div>
    );

  }
}

export default WithRouter(ContainerPage);