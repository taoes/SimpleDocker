import {Button, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import dateToStr from "../../utils/DateTime";
import InspectVolume from "../../api/Model/Volumn/InsepectVolume";
import {getVolumes} from "../../api/Volumes/Volumes";


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
            render: Scope => <Tag>{Scope.toUpperCase()}</Tag>,
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
            width: 180,
            render: CreatedAt => <span>{CreatedAt}</span>,
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address 4',
            fixed: 'right',
            width: 120,
            render: (_, image: InspectVolume) => {
                return (
                    <Space>
                        <Button size="small" type="link">运行</Button>
                        <Button size="small" type="link">详情</Button>
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


    return (
        <div id="imagePage" className={"box"}>
            <Table columns={columns} dataSource={volumes} size={"small"}/>
        </div>
    )
}

export default VolumePage;