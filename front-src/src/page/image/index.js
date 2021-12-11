import {Component} from "react";


import {Button, Checkbox, Dropdown, Input, Menu, Modal, Space, Table, Tag} from "antd";
import {
    DeleteOutlined,
    ExportOutlined,
    TagOutlined,
    InfoCircleOutlined,
    CloudDownloadOutlined,
    BuildOutlined
} from '@ant-design/icons';


import {getImageList} from "../../api/ImageApi";
import formatDate from '../../utils/DateTime'
import bytesToSize from '../../utils/ByteSize'
import ImagePullModal from '../../components/image/pull'

import './index.css'
import RunNewContainerStep from "../../components/image/run";

/**
 * 主页布局文件
 */
class ImagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageList: [],
            filterKey: '',
            pullImageModalStatus: false,
            runNewContainerModalStatus: false,
            configNewContainerParam: {},
        }

    }


    componentDidMount() {
        this.refreshList()
    }

    refreshList = function () {
        getImageList().then(resp => {
            let imageList = resp.data
            this.setState({imageList})
        })
    }


    // 更新镜像拉去Modal
    updateImagePullStatus(status) {
        this.setState({pullImageModalStatus: status})
    }


    // 更新运行镜像Modal
    showRunNewContainerStatus(configNewContainerParam) {
        this.setState({runNewContainerModalStatus: true, configNewContainerParam})
    }

    render() {
        const menu = function (image) {
            return (
                <Menu>
                    <Menu.Item icon={<InfoCircleOutlined/>} key={image.Id + '-detail'}>
                        详情信息
                    </Menu.Item>

                    <Menu.Item icon={<TagOutlined/>} key={image.Id + '-update-tag'}>
                        更新标签
                    </Menu.Item>

                    <Menu.Item icon={<ExportOutlined/>} key={image.Id + '-export'}>
                        导出镜像
                    </Menu.Item>

                    <Menu.Item danger icon={<DeleteOutlined/>} key={image.Id + '-remove'}>
                        删除镜像
                    </Menu.Item>
                </Menu>
            )
        }

        const
            columns = [
                {
                    title: '容器ID',
                    dataIndex: 'Id',
                    key: 'name',
                    render: id => <span>{id.substring(0, 30)}</span>,
                    ellipsis: true,
                    width: 150,
                },
                {
                    title: '镜像标签',
                    dataIndex: 'RepoTags',
                    render: RepoTags => {
                        let item = RepoTags.map(t => {
                            let color = 'blue'
                            if (t.indexOf('none') !== -1) {
                                color = 'red'
                            } else if (t.indexOf('latest') !== -1) {
                                color = 'green'
                            }
                            return <Tag key={t} color={color}>{t}</Tag>
                        })
                        return item
                    },
                    key: 'Size',
                    width: 700,
                },
                {
                    title: '镜像大小',
                    dataIndex: 'Size',
                    render: size => <span>{bytesToSize(size)}</span>,
                    key: 'Size',
                    width: 120,
                },
                {
                    title: '创建时间',
                    dataIndex: 'Created',
                    key: 'Created',
                    width: 120,
                    render: time => <span>{formatDate(time * 1000)}</span>,
                },
                {
                    title: '操作',
                    dataIndex: 'address',
                    key: 'address 4',
                    fixed: 'right',
                    width: 180,
                    render: (text, image) => {
                        let imageId = image.Id
                        return (
                            <Space>
                                <Button size="small" type="link"
                                        onClick={() => this.showRunNewContainerStatus({imageId})}>运行</Button>
                                <Button size="small" type="link">详情</Button>
                                <Dropdown overlay={() => menu(image)} arrow={true}>
                                    <Button size="small" type="link">更多</Button>
                                </Dropdown>
                            </Space>
                        )
                    }

                },
            ];

        let imageListOfFilter = this.state.imageList.filter(image => {
            if (!this.state.filterKey) {
                return true
            }
            return image.Id.indexOf(this.state.filterKey) !== -1 || (JSON.stringify(image.RepoTags).indexOf(this.state.filterKey) !== -1);
            ;
        });

        return (

            <div>
                <div style={{
                    margin: 10
                }
                }>
                    <Space>
                        <Button type="primary"
                                icon={<CloudDownloadOutlined/>}
                                onClick={() => this.updateImagePullStatus(true)}>拉取</Button>
                        <Button type="primary" icon={<BuildOutlined/>}>构建</Button>

                        <Input placeholder="请输入过滤词" style={{width: 400}} allowClear
                               onChange={(e) => this.setState({filterKey: e.target.value})}/>
                        <Checkbox checked>包含无效镜像</Checkbox>
                    </Space>
                </div>

                <Table
                    bordered
                    size="small"
                    pagination="bottomCenter"
                    columns={columns}
                    dataSource={imageListOfFilter}/>
                <Modal
                    visible={this.state.pullImageModalStatus}
                    width={800}
                    style={{overflow: 'auto'}}
                    closable={false}
                    okText="确定"
                    cancelText="导出"
                    onOk={() => this.updateImagePullStatus(false)}>
                    <ImagePullModal/>
                </Modal>

                <Modal
                    visible={this.state.runNewContainerModalStatus}
                    width={800}
                    closable={false}
                    title="创建新的容器"
                    okText="好"
                    cancelText="取消"
                    onOk={() => this.setState({runNewContainerModalStatus: false})}>
                    <RunNewContainerStep config={this.state.configNewContainerParam}/>
                </Modal>
            </div>
        )

    }
}

export default ImagePage;
