import {Component} from "react";
import {Button, Divider, Input, Table, Tag} from "antd";
import {getVolumeList} from "../api/VolumeApi";
import formateDate from '../utils/DateTime'
import bytesToSize from '../utils/ByteSize'

/**
 * 主页布局文件
 */
class VolumePage extends Component {

    constructor(props) {
        super(props);
        this.state = {volumeList: []}
    }


    componentDidMount() {
        getVolumeList().then(resp => {
            let volumeList = resp.data
            this.setState({volumeList:volumeList.Volumes})
        })
    }


    render() {
        const columns = [
            {
                title: '卷名称',
                dataIndex: 'Name',
                key: 'name',
                render: id => <span>{id.substring(0, 30)}</span>,
                ellipsis: true,
                width: 150,
            },
            {
                title: '卷模式',
                dataIndex: 'Driver',
                key: 'Driver',
                width: 30,
            },
            {
                title: '挂载位置',
                dataIndex: 'Mountpoint',
                key: 'Mountpoint',
                ellipsis: true,
                width: 120,
            },
            {
                title: '作用域',
                dataIndex: 'Scope',
                key: 'Scope',
                ellipsis: true,
                width: 30,
            },
            {
                title: '创建时间',
                dataIndex: 'CreatedAt',
                key: 'CreatedAt',
                width: 80
            },
            {
                title: '操作',
                dataIndex: 'address',
                key: 'address 4',
                fixed: 'right',
                width: 80,
                render: () =>
                    <div>
                        <Button size="small" type="primary">运行</Button>
                        <Divider type="vertical"/>
                        <Button size="small" type="danger">删除</Button>
                        <Divider type="vertical"/>
                        <Button size="small">更多</Button>
                    </div>

            },
        ];

        return (
            <div>
                <div style={{margin: 10}}>
                    <Input placeholder="请输入过滤词" style={{width: 400}}/>
                </div>
                <Table
                    bordered
                    pagination="bottomCenter"
                    columns={columns}
                    dataSource={this.state.volumeList} size="small"/>
            </div>
        )

    }
}

export default VolumePage;