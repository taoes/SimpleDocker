import {Button, Divider, message, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {CloudSyncOutlined, ReloadOutlined} from '@ant-design/icons'
import {ColumnsType} from "antd/es/table";
import InspectVolume from "../../api/Model/Volumn/InsepectVolume";
import {getVolumes} from "../../api/Volumes/Volumes";
import IconFont from "../../component/Base/IconFont";
import Search from "antd/es/input/Search";


function VolumePage() {

  const columns: ColumnsType<InspectVolume> = [
    {
      title: '容器ID',
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
      title: '挂载点',
      dataIndex: 'Mountpoint',
      render: Mountpoint => <span>{Mountpoint}</span>,
      key: 'Mountpoint'
    },
    {
      title: '创建时间',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      width: 200,
      render: CreatedAt => <span>{CreatedAt}</span>,
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address 4',
      fixed: 'right',
      width: 200,
      render: (_, image: InspectVolume) => {
        return (
            <Space>
              <Button size={"small"}>绑定</Button>
              <Button size={"small"}>详情</Button>
              <Button danger type={"ghost"} size={"small"}> 删除</Button>
            </Space>
        )
      }

    },
  ];


  let [volumes, setVolumes] = useState<Array<InspectVolume>>([])
  useEffect(() => {
    refresh()
  }, [])

  function refresh() {
    message.info('正在加载Docker储存卷列表');
    getVolumes().then(data => {
      setVolumes(data.Volumes)
    })
  }

  return (
      <div id="imagePage" className={"box"}>
        <div>
          <div className="imageController inline">
            <Search placeholder="input search text" style={{width: 400}}/>
            <Button onClick={refresh} className="ml-2" icon={<ReloadOutlined/>}
                    type={"primary"}>刷新</Button>
            <Button className="ml-2" icon={<CloudSyncOutlined/>} danger type={"primary"}>优化</Button>
          </div>
        </div>
        <Table columns={columns} scroll={{x: 1000}} dataSource={volumes} size={"small"}/>
      </div>
  )
}

export default VolumePage;