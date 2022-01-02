import React, {Component} from "react";
import {Button, Drawer, Input, message, Modal, Space, Table, Form, Tag} from "antd";
import {getVolumeList, create, removeVolume} from "../../api/VolumeApi";
import VolumeDetail from "../../components/volume/detail";
import {BuildOutlined} from "@ant-design/icons";

/**
 * 主页布局文件
 */
class VolumePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            volumeList: [],
            detailDrawer: false,
            volumeName: null,
            createModal: false
        }
    }


    componentDidMount() {
        this.refreshList()
    }

    // 刷新卷列表
    refreshList = () => {
        getVolumeList().then(resp => {
            let {Volumes} = resp.data
            this.setState({volumeList: Volumes})
        })
    }

    // 显示卷详情
    showDetailDrawer(volumeName) {
        this.setState({detailDrawer: true, volumeName});
    }

    // 移除卷信息
    remove(volumeName) {
        removeVolume(volumeName)
            .then(r => {
                message.info('移除成功');
                this.refreshList()
            })
            .catch(e => message.error(e))
    }

    onFinish = (values) => {
        create(values).then(() => {
            message.info("创建存储卷成功")
            this.refreshList()
            this.setState({createModal: false});
        })
    };


    render() {
        const columns = [
            {
                title: '卷名称',
                dataIndex: 'Name',
                key: 'name',
                render: id => <span>{id.substring(0, 30)}</span>,
                ellipsis: true,
                width: 50,
            },
            {
                title: '卷模式/作用域',
                dataIndex: 'Driver',
                key: 'Driver',
                width: 20,
                render: (text) => {
                    return (
                        <div>
                            <Tag color="blue">{text}</Tag>
                            <Tag color="green">{text}</Tag>
                        </div>)
                }
            },
            {
                title: '挂载位置',
                dataIndex: 'Mountpoint',
                key: 'Mountpoint',
                ellipsis: true,
                width: 120,
            },
            {
                title: '创建时间',
                dataIndex: 'CreatedAt',
                key: 'CreatedAt',
                width: 50
            },
            {
                title: '操作',
                dataIndex: 'address',
                key: 'address 4',
                fixed: 'right',
                width: 30,
                render: (text, record) => {
                    let {Name} = record;

                    return <Space>
                        <Button size="small" type="link" onClick={() => this.showDetailDrawer(Name)}>详情</Button>
                        <Button size="small" type="link" onClick={() => this.remove(Name)}>删除</Button>
                    </Space>
                }
            }];

        return (
            <div>
                <div style={{margin: 10}}>
                    <Button type="primary"
                            style={{marginRight: 10}}
                            icon={<BuildOutlined/>}
                            onClick={() => this.setState({createModal: true})}>创建</Button>
                    <Input placeholder="请输入过滤词" style={{width: 400}}/>
                </div>
                <Table
                    bordered
                    pagination="bottomCenter"
                    columns={columns}
                    dataSource={this.state.volumeList} size="small"/>

                {/*卷详情*/}
                <Drawer title="卷详情"
                        destroyOnClose={true}
                        onClose={() => this.setState({detailDrawer: false})}
                        visible={this.state.detailDrawer}>
                    <VolumeDetail volumeName={this.state.volumeName}/>
                </Drawer>

                <Modal
                    visible={this.state.createModal}
                    title="创建新的卷存储"
                    footer={null}
                    destroyOnClose={true}
                    onCancel={() => this.setState({createModal: false})}>
                    <Form
                        name="basic"
                        onFinish={this.onFinish}
                        autoComplete="off">
                        <Form.Item label="存储卷名称"
                                   name="name"
                                   size="small"
                                   labelCol={{offset: 1}}
                                   rules={[{required: false, message: '请输入正确的存储卷名称!!!'}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item label="存储卷驱动" name="driver" labelCol={{offset: 1}}
                                   rules={[{required: true, message: '请输入正确的存储卷类型!!!'}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 1}}>
                            <Space>
                                <Button type="primary" htmlType="submit">创建</Button>
                                <Button type="danger">重置</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>

            </div>
        )

    }
}

export default VolumePage;
