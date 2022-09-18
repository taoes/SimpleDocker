import { Button, message, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import DockerEndpoint from "../../../api/Model/DockerEndpoint";
import { endpointList, testEndpoint } from "../../../api/Client/DockerEndpointApi";


interface Props {
}

interface State {
  endpoints: Array<DockerEndpoint>
}


export default class DockerServerTab extends React.Component<Props, State> {
  private readonly columns: ColumnsType<DockerEndpoint>

  constructor(props: Props) {
    super(props);
    this.state = {
      endpoints: []
    }
    this.columns = [
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
              <Button size="small" onClick={() => this.testEndpoint(server)}>测试</Button>
              <Button size="small">详情</Button>
              <Button size="small" danger>禁用</Button>
              <Button size="small" danger>删除</Button>
            </Space>
          )
        }
      }]

  }


  componentDidMount() {
    this.loadDockerEndpoint()
  }

  testEndpoint = (endpoint: DockerEndpoint) => {
    let key = new Date().getTime();
    message.loading({ content: '正在测试Docker服务端连通性，请稍后.....', key, duration: 15 }).then();
    testEndpoint(endpoint.id).then(resp => {
      if (resp.code === 0) {
        message.info({ content: '恭喜,该Endpoint已经正常连接!', key, duration: 5 }).then();
        return
      }
      message.error({ content: `抱歉,无法连接${endpoint.id}-${endpoint.name},异常信息:${resp.msg}`, key, duration: 10 }).then();
    })
  }


  loadDockerEndpoint = () => {
    endpointList()
      .then(resp => {
        if (resp.code !== 0) {
          message.error("Docker端点服务列表加载失败，请检查服务是否正常").then();
          return
        }
        this.setState({ endpoints: resp.data })
      })
  }


  render() {
    return (
      <div id="dockerServerTab">
        <Space id={"dockerEndpoint"}>
          <Button>新增</Button>
          <Button>帮助</Button>
        </Space>

        <Table className="box" columns={this.columns}
          dataSource={this.state.endpoints} size={"small"}
          scroll={{ x: 1000 }}
          rowKey={record => record.id} />
      </div>
    )
  }
}
