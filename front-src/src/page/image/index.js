import {Component} from "react";


import {Button, Checkbox, Dropdown, Input, Menu, Modal, Space, Table, Tag, Drawer, Spin, Tooltip} from "antd";
import {
    DeleteOutlined,
    ExportOutlined,
    TagOutlined,
    QuestionCircleOutlined,
    CloudDownloadOutlined,
    BuildOutlined
} from '@ant-design/icons';


import {getImage, getImageList} from "../../api/ImageApi";
import formatDate from '../../utils/DateTime'
import bytesToSize from '../../utils/ByteSize'
import ImagePullModal from '../../components/image/pull'

import './index.css'
import RunNewContainerStep from "../../components/image/run";
import {JsonEditor as Editor} from "jsoneditor-react";
import ImageDetail from "../../components/image/detail";

/**
 * 主页布局文件
 */
class ImagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageId: this.props.imageId,
            imageList: [],
            filterKey: '',
            pullImageModalStatus: false,
            runNewContainerModalStatus: false,
            showImageDetailModal: false,
            imageDetail: null,
            imageIdOfRun: {},
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
    showRunNewContainerStatus(image) {
        this.setState({runNewContainerModalStatus: true, imageIdOfRun: image.Id})
    }

    // 显示详情页
    async showImageDetail(image) {
        let {data: imageDetail} = await getImage(image.Id)
        this.setState({showImageDetailModal: true, imageDetail: imageDetail})
    }

    // 移除镜像
    removeImage = (image) => {
        this.setState({showRemoveImageModal: true, removeImageId: image.Id})
    }

    render() {
        const menu = (image) => {
            return (
                <Menu>
                    <Menu.Item icon={<TagOutlined/>} key={image.Id + '-update-tag'}>
                        更新标签
                    </Menu.Item>

                    <Menu.Item icon={<ExportOutlined/>} key={image.Id + '-export'}>
                        导出镜像
                    </Menu.Item>

                    <Menu.Item danger icon={<DeleteOutlined/>} key={image.Id + '-remove'}
                               onClick={() => this.removeImage(image)}>
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
                        return (
                            <Space>
                                <Button size="small" type="link"
                                        onClick={() => this.showRunNewContainerStatus(image)}>运行</Button>
                                <Button size="small" type="link"
                                        onClick={() => this.showImageDetail(image)}>详情</Button>

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
                    okText="关闭"
                    cancelText="导出"
                    destroyOnClose={true}
                    onCancel={() => this.setState({pullImageModalStatus: false})}
                    footer={[]}>
                    <ImagePullModal/>
                </Modal>

                <Modal
                    visible={this.state.runNewContainerModalStatus}
                    width={800}
                    closable={false}
                    title="创建新的容器"
                    okText="好"
                    cancelText="取消"
                    destroyOnClose={true}
                    onOk={() => this.setState({runNewContainerModalStatus: false})}>
                    <RunNewContainerStep imageId={this.state.imageIdOfRun}/>
                </Modal>


                {/*移除镜像对话框*/}
                <Modal
                    visible={this.state.showRemoveImageModal}
                    closable={false}
                    title="移除镜像"
                    okText="好"
                    cancelText="取消"
                    destroyOnClose={true}
                    onOk={() => this.setState({showRemoveImageModal: false})}>
                    <span>确定移除该镜像吗</span>
                    <br/>
                    <Space style={{marginTop: 20}}>
                        <Checkbox>强制移除镜像</Checkbox>
                        <Checkbox>移除父级层</Checkbox>
                    </Space>
                </Modal>

                {/*侧边栏 显示镜像详情信息*/}
                <Drawer title="镜像详情"
                        destroyOnClose={true}
                        okText="好"
                        width={720}
                        onClose={() => this.setState({showImageDetailModal: false})}
                        visible={this.state.showImageDetailModal}>
                    <ImageDetail info={this.state.imageDetail}/>
                </Drawer>
            </div>
        )

    }
}

export default ImagePage;
