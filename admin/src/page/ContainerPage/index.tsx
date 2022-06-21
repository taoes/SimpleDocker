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

function ContainerPage() {

  let [currentContainerId, setCurrentContainerId] = useState<string>("")
  let [drawerStatus, setDrawerStatus] = useState<boolean>(false)
  let [moreDrawerStatus, setMoreDrawerStatus] = useState<boolean>(false)
  let [containers, setContainers] = useState<Array<DockerContainer>>([])
  let navigator = useNavigate();


  let operatorContainer = (operate: any, containerId: string) => {
    updateContainer(containerId, operate).then(resp => {
      refresh()
    })
  }


  let columns: ColumnsType<DockerContainer> = [
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
            <Button onClick={() => operatorContainer(operateCommon, record.Id)} size={"small"}
                    style={{color: operatorColor}}>{operateDesc}</Button>
            <Button onClick={() => navigateLogPage(record)} size={"small"}>日志</Button>
            <Button onClick={() => showDetail(record)} size={"small"}>详情</Button>
            <Button onClick={() => showMoreOperatorDrawer(record)} size={"small"}>更多</Button>
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
  let showMoreOperatorDrawer = (record: DockerContainer) => {
    setCurrentContainerId(record.Id)
    setMoreDrawerStatus(true)
  }
  let hideMoreOperatorDrawer = () => {
    setCurrentContainerId("")
    setMoreDrawerStatus(false)
  }

  /*转到日志页*/
  let navigateLogPage = (record: DockerContainer) => {
    navigator(`/app/container/${record.Id}/log`)
  }

  let navigateLogPageByCurrent = () => {
    navigator(`/app/container/${currentContainerId}/log`)
  }

  useEffect(() => refresh(), [])

  function update(operate: string) {
    setMoreDrawerStatus(false)
    updateContainer(currentContainerId, operate).then(data => refresh())
  }


  let refresh = () => {
    getContainers().then(resp => {
      if (resp.code !== 0) {
        message.error(`加载容器列表失败:${resp.msg}`).then();
        return
      }
      setContainers(resp.data)
    })
  }

  let openTerminal = () => {
    navigator(`/terminal/container/${currentContainerId}/client/DEFAULT`)
  }

  return (
      <div id="imagePage" className={"box"}>
        <div className="is-flex">
          <div className="imageController mb-2">
            <Search placeholder="输入关键字已搜索容器" style={{width: 400}}/>
            <Select defaultValue={["running", 'paused']} style={{width: 400}} className={"ml-1"}
                    mode="multiple">
              <Select.Option value={"running"}>运行中</Select.Option>
              <Select.Option value={"created"}>已创建</Select.Option>
              <Select.Option value={"stop"}>已停止</Select.Option>
              <Select.Option value={"paused"}>暂停中</Select.Option>
            </Select>
            <Button onClick={refresh} className="ml-2" icon={<ReloadOutlined/>}>刷新</Button>
            <Button className="ml-2" icon={<CloudSyncOutlined/>} danger>优化</Button>

          </div>
        </div>

        <Table
            size={"small"}
            rowKey={record => record.Id}
            columns={columns} dataSource={containers}
            scroll={{x: 1000}}/>

        <Drawer title="容器详情"
                destroyOnClose={true}
                width={"50%"}
                onClose={hideDetail}
                visible={drawerStatus}>
          <ContainerDetailDrawer containerId={currentContainerId}/>
        </Drawer>


        <Drawer title="更多操作"
                destroyOnClose={true}
                width={350}
                onClose={hideMoreOperatorDrawer}
                visible={moreDrawerStatus}>
          <div className={"flex"}>
            <Button className={"m-1"} type="ghost">容器监控</Button>
            <Button className={"m-1"} type="ghost" onClick={() => openTerminal()}>容器终端</Button>
            <Button className={"m-1"} type="default"
                    onClick={navigateLogPageByCurrent}>容器日志</Button>
            <Button className={"m-1"} type="default">容器网络</Button>
            <Button className={"m-1"} type="default">文件管理</Button>
            <Button className={"m-1"} type="default" onClick={() => update("PAUSE")}>暂停容器</Button>
            <Button className={"m-1"} type="default" onClick={() => update("PAUSE")}>重命名容器</Button>
            <Button className={"m-1"} danger onClick={() => update("REMOVE")}>移除容器</Button>
          </div>
        </Drawer>
      </div>
  )
}

export default ContainerPage;