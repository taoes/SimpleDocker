import {Button, Drawer, message, Select, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import dateToStr from "../../utils/Time";
import DockerContainer from "../../api/Model/DockerContainer";
import {getContainers, updateContainer} from "../../api/Container/ContainerApi";
import ContainerDetailDrawer from "../../component/App/Container/ContainerDetailDrawer";
import ContainerPort from "../../api/Model/ContainerPort";
import Search from "antd/es/input/Search";
import {CloudSyncOutlined, ReloadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import React from "react";
import {RouterProps} from "react-router";
import {NavigateFunction} from "react-router/lib/hooks";
import RouterInfo from "../../router/Router";
import WithRouter from "../../router/WithRouter";


/* 容器标识文案 */
export interface ContainerStateText {
  stateColor: string
  stateDesc: string
  operateCommon: string
  operateDesc: string
  operatorColor: string
}

let getStatusInfo = function (State: string): ContainerStateText {
  if (State === 'running') {
    return {
      stateColor: 'green',
      stateDesc: "运行中",
      operateCommon: "STOP",
      operateDesc: "停止",
      operatorColor: 'red'
    }
  } else if (State === 'exited') {
    return {
      stateColor: 'red',
      stateDesc: "已停止",
      operateCommon: "START",
      operateDesc: "启动",
      operatorColor: 'green'
    }
  } else if (State === 'paused') {
    return {
      stateColor: 'purple',
      stateDesc: "已暂停",
      operateCommon: "UNPAUSE",
      operateDesc: "恢复",
      operatorColor: 'green'
    }
  } else if (State === 'created') {
    return {
      stateColor: 'blue',
      stateDesc: "已创建",
      operateCommon: "START",
      operateDesc: "启动",
      operatorColor: 'green'
    }
  }
  return {
    stateColor: 'lightgray',
    stateDesc: "未知状态",
    operateCommon: "STOP",
    operateDesc: "停止",
    operatorColor: 'green'
  }
}


let portShow = (container: DockerContainer) => {
  return container.Ports.map((p: ContainerPort, index: number) => {
    if (!!p.IP) {
      return <Tag key={index}
                  className={"mt-1"}>{p.IP}:{p.PublicPort}-{p.PrivatePort}/{p.Type.toUpperCase()}</Tag>
    } else {
      return null;
    }
  })
}

interface Props {
  router: RouterInfo
}

interface State {
  currentContainerId: string,
  detailDrawerStatus: boolean,
  moreDrawerStatus: boolean,
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
        return <span style={{color: statusInfo.stateColor}}>{statusInfo.stateDesc}</span>
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
        let {operateCommon, operateDesc, operatorColor} = getStatusInfo(record.State);
        return <div style={{wordWrap: 'break-word', wordBreak: 'break-word'}}>
          <Space>
            <Button onClick={() => this.operatorContainer(operateCommon, record.Id)} size={"small"}
                    style={{color: operatorColor}}>{operateDesc}</Button>
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
      this.setState({containers: resp.data})
    })
  }


  openTerminal = () => {
    this.navigate(`/terminal/container/${this.state.currentContainerId}/client/DEFAULT`)
  }

  render() {
    return (
        <div id="imagePage" className={"box"}>
          <div className="is-flex">
            <div className="imageController mb-2">
              <Search placeholder="输入关键字已搜索容器" style={{width: 400}}/>
              <Select defaultValue={[]} style={{width: 400}} className={"ml-1"} mode="multiple">
                <Select.Option value={"running"}>运行中</Select.Option>
                <Select.Option value={"created"}>已创建</Select.Option>
                <Select.Option value={"stop"}>已停止</Select.Option>
                <Select.Option value={"paused"}>暂停中</Select.Option>
              </Select>
              <Button onClick={() => this.loadContainer()} className="ml-2" icon={<ReloadOutlined/>}>刷新</Button>
              <Button className="ml-2" icon={<CloudSyncOutlined/>} danger>清理</Button>
            </div>
          </div>

          <Table
              size={"small"}
              rowKey={record => record.Id}
              rowSelection={{fixed: 'left', type: 'checkbox'}}
              columns={this.columns} dataSource={this.state.containers}
              scroll={{x: 1000}}/>

          <Drawer title="容器详情"
                  destroyOnClose={true}
                  width={"50%"}
                  onClose={() => this.hideDetail()}
                  visible={this.state.detailDrawerStatus}>
            <ContainerDetailDrawer containerId={this.state.currentContainerId}/>
          </Drawer>


          <Drawer title="更多操作"
                  destroyOnClose={true}
                  width={350}
                  onClose={() => this.hideMoreOperatorDrawer()}
                  visible={this.state.moreDrawerStatus}>
            <div className={"flex"}>
              <Button className={"m-1"} type="ghost">容器监控</Button>
              <Button className={"m-1"} type="ghost"
                      onClick={() => this.openTerminal()}>容器终端</Button>
              <Button className={"m-1"} type="default"
                      onClick={() => this.navigateLogPage(null)}>容器日志</Button>
              <Button className={"m-1"} type="default">容器网络</Button>
              <Button className={"m-1"} type="default">文件管理</Button>
              <Button className={"m-1"} type="default"
                      onClick={() => this.operatorContainer("PAUSE", null)}>暂停容器</Button>
              <Button className={"m-1"} type="default"
                      onClick={() => this.operatorContainer("PAUSE", null)}>重命名容器</Button>
              <Button className={"m-1"} danger
                      onClick={() => this.operatorContainer("REMOVE", null)}>移除容器</Button>
            </div>
          </Drawer>
        </div>
    );

  }
}

export default WithRouter(ContainerPage);