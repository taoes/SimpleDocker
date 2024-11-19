import { Button, Dropdown, Space, Table } from "antd";
import { SnippetsOutlined, PlayCircleOutlined, MoreOutlined, CopyOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import imageSlice from "../store/imageSlice";
import modalSlice from "../store/modalSlice";

export default function ImageTables() {
    const dispatch = useDispatch()
    const { list, pagination } = useSelector(state => state.image)

    const { updatePagination } = imageSlice.actions
    const { switchImageRunModalStatus } = modalSlice.actions;


    const columns = [{
        title: '镜像ID',
        dataIndex: 'imageId',
        key: 'imageId'
    },
    {
        title: '镜像Tag',
        dataIndex: 'imagetag',
        key: 'imageId',
    },
    {
        title: '镜像大小',
        dataIndex: 'imageSize',
        key: 'imageId',
    },
    {
        title: '容器数量',
        dataIndex: 'imageContainerSize',
        key: 'imageId',
    },
    {
        title: '构建时间',
        dataIndex: 'imageBuildTIme',
        key: 'imageId',
    }, {
        title: '操作',
        key: 'imageId',
        width: 200,
        dataIndex: 'imageOpt',
        render: (_, { imageId: imageid }) => {
            const imageMoreMenuProps = {
                items: [
                    { key: 'detailImage', label: '克隆', imageid, icon: <CopyOutlined /> },
                    { key: 'pushImage', label: '推送', imageid, icon: <CopyOutlined /> },
                    { key: 'exportImage', label: '导出', imageid, icon: <ExportOutlined /> },
                    { key: 'deleteImage', label: '删除', imageid, icon: <DeleteOutlined /> }
                ],
                onClick: imageMoreBtnOnClick
            }
            return (
                <Space>
                    <Button size="small" icon={<PlayCircleOutlined />} onClick={runImage}>运行</Button>
                    <Button size="small" icon={<SnippetsOutlined />}>详情</Button>
                    <Dropdown menu={imageMoreMenuProps} size="small">
                        <MoreOutlined />
                    </Dropdown>
                </Space>
            )
        }
    }]

    const imageMoreBtnOnClick = ({ item, key, keyPath, domEvent }) => {
        console.log({ item, key, keyPath, domEvent })
    }

    const onTableChange = (pagination, filters, sorter) => {
        dispatch(updatePagination(pagination))
    }


    const runImage = () => {
        dispatch(switchImageRunModalStatus())
    }


    return (
        <Table columns={columns} size="small" dataSource={list} pagination={pagination} rowKey="imageId" onChange={onTableChange} />
    )
}