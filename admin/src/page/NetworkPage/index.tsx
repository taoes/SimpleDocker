import {Button, Divider, message, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import DockerNetwork from "../../api/Model/Network/DockerNetwork";
import {getNetworkList} from "../../api/Network/NetworkApi";
import IconFont from "../../component/Base/IconFont";
import Search from "antd/es/input/Search";
import {ReloadOutlined} from "@ant-design/icons";


function NetworkPage() {

  const columns: ColumnsType<DockerNetwork> = [
    {
      title: '容器ID',
      dataIndex: 'Id',
      key: 'Id',
      render: Id => <span>{!!Id && Id.substring(0, 10)}</span>,
      ellipsis: true,
      width: 150,
    }, {
      title: '名称',
      dataIndex: 'Name',
      key: 'Name',
      render: Name => <span>{!!Name && Name.substring(0, 10)}</span>,
      ellipsis: true,
      width: 150,
    },
    {
      title: '作用域',
      dataIndex: 'Scope',
      render: Scope => <span>{Scope.toUpperCase()}</span>,
      key: 'Scope',
      width: 100,
    }, {
      title: '网络模式',
      dataIndex: 'Driver',
      render: Driver => <span>{Driver.toUpperCase()}</span>,
      key: 'Driver',
      width: 100
    }, {
      title: '启用IPV6',
      dataIndex: 'EnableIPv6',
      render: EnableIPv6 => <span>{EnableIPv6 ? "是" : "否"}</span>,
      key: 'EnableIPv6',
      width: 100
    }, {
      title: '内建网络',
      dataIndex: 'Internal',
      render: Internal => <span>{Internal ? "是" : "否"}</span>,
      key: 'Internal',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'Created',
      key: 'Created',
      width: 180,
      render: Created => <span>{Created}</span>,
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address 4',
      fixed: 'right',
      width: 120,
      render: (_, network: DockerNetwork) => {
        return (
            <Space>
              <Button size={"small"} type={"ghost"}>连接</Button>
              <Button size={"small"} type={"ghost"}>详情</Button>
              <Button size={"small"}  danger>删除</Button>
            </Space>
        )
      }

    },
  ];


  let [networks, setNetworks] = useState<Array<DockerNetwork>>([])
  useEffect(() => {
    refresh()
  }, [])

  function refresh() {
    message.info('正在加载Docker网络列表').then();
    getNetworkList().then(data => {
      setNetworks(data)
    })
  }


  return (
      <div id="imagePage" className={"box"}>
        <div>
          <div className="imageController inline">
            <Search placeholder="input search text" style={{width: 400}}/>
            <Button onClick={refresh} className="ml-2" icon={<ReloadOutlined/>}
                    type={"primary"}>刷新</Button>
          </div>
        </div>
        <Table
            scroll={{x: 1000}}
            columns={columns}
            dataSource={networks} size={"small"}/>
      </div>
  )
}

export default NetworkPage;