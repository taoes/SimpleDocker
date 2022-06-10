import {Button, Divider, message, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {CloudSyncOutlined,ReloadOutlined} from '@ant-design/icons'
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
            render: Scope => <Tag color="blue">{Scope.toUpperCase()}</Tag>,
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
                        <IconFont type={"icon-icon-test19"}/>
                        <Divider type="vertical"/>
                        <IconFont type={"icon-icon_xiangqing"}/>
                        <Divider type="vertical"/>
                        <IconFont type={"icon-icon_shanchu"}/>
                    </Space>
                )
            }

        },
    ];


    let [volumes, setVolumes] = useState<Array<InspectVolume>>([])
    useEffect(() => {
        getVolumes().then(data => {
            setVolumes(data.Volumes)
        })
    }, [])

    function refresh() {
        message.warning('正在刷新储存列表');
    }

    return (
        <div id="imagePage" className={"box"}>
            <div>
                <div className="imageController inline">
                    <Search placeholder="input search text" style={{width: 400}}/>
                    <Button onClick={refresh} className="ml-2" icon={<ReloadOutlined />}>刷新</Button>
                    <Button danger className="ml-2" icon={<CloudSyncOutlined />}>优化</Button>
                </div>
            </div>
            <Table columns={columns} scroll={{x: 1000}} dataSource={volumes} size={"small"}/>
        </div>
    )
}

export default VolumePage;