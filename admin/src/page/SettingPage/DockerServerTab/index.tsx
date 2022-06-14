import {Button, message, Space, Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {useEffect, useState} from "react";
import DockerEndpoint from "../../../api/Model/DockerEndpoint";
import {endpointList} from "../../../api/Client/DockerEndpointApi";


const columns: ColumnsType<DockerEndpoint> = [
  {
    title: '容器ID',
    dataIndex: 'id',
    render: id => <span>{id && id.substring(0, 10)}</span>,
    ellipsis: true,
    width: 200,
  },
  {
    title: '名称',
    dataIndex: 'name',
    render: (name) => <span>{name}</span>,
    width: 200,
  },
  {
    title: '类型',
    dataIndex: 'typeName',
    render: (typeName) => <Tag color={"blue"}>{typeName}</Tag>,
    width: 120,
  }, {
    title: '状态',
    dataIndex: 'stateName',
    render: (stateName) => <Tag color={"green"}>{stateName}</Tag>,
    width: 120,
  },
  {
    title: '最近测试时间',
    dataIndex: 'latestTestTime',
    width: 200,
    render: (latestTestTime) => <span>{latestTestTime}</span>,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 200,
    render: (createdAt) => <span>{createdAt}</span>,
  },
  {
    title: '操作',
    dataIndex: 'address',
    fixed: 'right',
    width: 220,
    render: (_, server: DockerEndpoint) => {
      return (
          <Space>
            <Button size="small">测试</Button>
            <Button size="small">详情</Button>
            <Button size="small" danger>禁用</Button>
            <Button size="small" danger>删除</Button>
          </Space>
      )
    }

  }]


export default function DockerServerTab() {
  let [endpoints, setEndpoint] = useState<Array<DockerEndpoint>>([])
  useEffect(() => {
    endpointList()
    .then(resp => {
      if (resp.code !== 0) {
        message.error("Docker端点服务列表加载失败，请检查服务是否正常").then();
        return
      }
      setEndpoint(resp.data)
    })
  }, [])


  return (
      <div id="dockerServerTab">
        <Table className="box" columns={columns} dataSource={endpoints} size={"small"}
               scroll={{x: 1000}}
               rowKey={record => record.id}/>
      </div>
  )
}
