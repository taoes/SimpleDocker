import React, {useEffect, useState} from "react";


import {Button, Checkbox, Drawer, Form, Input, Modal, Skeleton, Space, Switch, Table, Tag} from "antd";
import {CloudDownloadOutlined, ScissorOutlined, SyncOutlined} from '@ant-design/icons';


import {list} from "../../api/ImageApi";
import ImagePullModal from '../../components/image/pull'

import './index.css'
import RunNewContainerStep from "../../components/image/run";
import ImageDetail from "../../components/image/detail";


import bytesToSize from "../../utils/ByteSize";
import formatDate from "../../utils/DateTime";

const modalInitState = {
    pull: false,
    run: false,
    remove: false,
    pure: false,
    detail: false,
    more: false
}

/**
 * 主页布局文件
 */
export default function ImagePage() {

    let [filter, setFilter] = useState("")
    let [currentImageId, setCurrentImageId] = useState(null)
    let [currentImages, setCurrentImages] = useState([])
    let [imagesOfFilter, setImagesOfFilter] = useState([])
    let [modalState, setModalState] = useState(modalInitState)


    // 初始化时候调用API刷新镜像列表
    useEffect(() => {
        list().then(data => {
            setCurrentImages(data)
            setImagesOfFilter(data)
        })
    }, []);


    // 过滤词变动时候重新刷新列表
    useEffect(() => {
        if (!filter) {
            return setImagesOfFilter(currentImages)
        }
        let images = currentImages.filter(image => image.Id.indexOf(filter) !== -1 || (JSON.stringify(image.RepoTags).indexOf(filter) !== -1));
        setImagesOfFilter(images)
    }, [filter])


    // 设置各个modal的显示状态
    function updateModalState(state, imageId) {
        setModalState({...modalState, ...state})
        if (!!imageId) {
            setCurrentImageId(imageId)
        }
    }


    function removeImage() {

    }


    function pureImage() {

    }

    const columns = [
        {
            title: '容器ID',
            dataIndex: 'Id',
            key: 'name',
            render: id => <span>{!!id && id.substring(0, 30).replaceAll("sha256:", '')}</span>,
            ellipsis: true,
            width: 150,
        },
        {
            title: '镜像标签',
            dataIndex: 'RepoTags',
            render: RepoTags => {

                if (!RepoTags) {
                    return null
                }
                return RepoTags.map(t => {
                    let color = 'blue'
                    if (t.indexOf('none') !== -1) {
                        color = 'red'
                    } else if (t.indexOf('latest') !== -1) {
                        color = 'green'
                    }
                    return <Tag key={t} color={color}>{t}</Tag>
                })
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
                                onClick={() => updateModalState({run: true}, image.Id)}>运行</Button>
                        <Button size="small" type="link"
                                onClick={() => updateModalState({detail: true}, image.Id)}>详情</Button>
                        <Button size="small" type="link"
                                onClick={() => updateModalState({more: true}, image.Id)}>更多</Button>
                    </Space>
                )
            }

        },
    ];


    return (
        <div>
            <div className="mt-2">
                <Space>
                    <Button icon={<SyncOutlined/>} onClick={() => this.refreshList()}>刷新</Button>
                    <Button icon={<CloudDownloadOutlined/>} onClick={() => updateModalState({pull: true})}>拉取</Button>
                    <Button icon={<ScissorOutlined/>} onClick={() => updateModalState({pure: true})}>清理</Button>
                    <Input placeholder="请输入过滤词" style={{width: 400}} allowClear
                           onChange={(e) => setFilter(e.target.value)}/>
                    <Checkbox checked>包含无效镜像</Checkbox>
                </Space>
            </div>

            <Skeleton loading={false} active>
                <Table
                    className="mt-4"
                    bordered
                    size="small"
                    pagination="bottomCenter"
                    columns={columns}
                    dataSource={imagesOfFilter}/>
            </Skeleton>
            <Modal
                visible={modalState.pull}
                width={800}
                style={{overflow: 'auto'}}
                okText="关闭"
                cancelText="导出"
                destroyOnClose={true}
                onCancel={() => updateModalState({pull: false})}
                footer={[]}>
                <ImagePullModal/>
            </Modal>

            <Modal
                visible={modalState.run}
                width={800}
                title="创建新的容器"
                footer={null}
                destroyOnClose={true}
                onCancel={() => updateModalState({run: false})}>
                <RunNewContainerStep imageId={currentImageId}/>
            </Modal>


            {/*移除镜像对话框*/}
            <Modal
                visible={modalState.remove}
                title="移除镜像"
                destroyOnClose={true}
                footer={null}
                bodyStyle={{"padding": 20}}
                onCancel={() => updateModalState({remove: false})}>
                <p>确定移除该镜像吗?</p>
                <p>Ps: 如果移除镜像失败，请勾选强制移除,强制移除会删除使用该镜像的容器</p>
                <Form name="basic" onFinish={removeImage} autoComplete="off">
                    <Form.Item label="强制移除" name="force" wrapperCol={{offset: 1}}>
                        <Switch defaultChecked={false}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 0}}>
                        <Button type="danger" htmlType="submit">移除</Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/*侧边栏 显示镜像详情信息*/}
            <Drawer title="镜像详情"
                    destroyOnClose={true}
                    okText="好"
                    width={720}
                    onCancel={() => updateModalState({detail: false})}
                    visible={modalState.detail}>
                <ImageDetail imageId={currentImageId}/>
            </Drawer>

            {/*    侧边栏 显示更多操作 */}
            <Drawer
                title="更多操作"
                destroyOnClose={true}
                okText="好"
                width={320}
                visible={modalState.more}
                onClose={() => updateModalState({more: false})}>

                < Space>
                    < Button block type="primary" onClick={() => alert('开发中')}>更新标签</Button>
                    <Button block type="primary" onClick={() => alert('开发中')}>导出镜像</Button>
                    <Button block type="danger" onClick={() => updateModalState(false)}>删除镜像</Button>
                </Space>
            </Drawer>
        </div>
    )
}