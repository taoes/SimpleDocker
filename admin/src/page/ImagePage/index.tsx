import {Button, Drawer, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {getDockerImages} from "../../api/Image/ImageApi";
import {ColumnsType} from "antd/es/table";
import DockerImage from "../../api/Model/DockerImage";
import bytesToSize from "../../utils/ByteSize";
import dateToStr from "../../utils/Time";
import ImageDetailDrawer from "../../component/App/Image/ImageDetailDrawer";


function ImagePage() {

    let [images, setImages] = useState<Array<DockerImage>>([])
    let [currentImageId, setCurrentImageId] = useState<string>("")
    let [drawerStatus, setDrawerStatus] = useState<boolean>(false)

    function showDetailDrawer(imageId: string) {
        setCurrentImageId(imageId)
        setDrawerStatus(true)
    }

    const columns: ColumnsType<DockerImage> = [
        {
            title: '容器ID',
            dataIndex: 'Id',
            render: id => <span>{!!id && id.substring(0, 17).replaceAll("sha256:", '')}</span>,
            ellipsis: true,
            width: 150,
        },
        {
            title: '镜像标签',
            dataIndex: 'RepoTags',
            render: (_, image: DockerImage) => {
                let RepoTags: Array<String> = image.RepoTags;
                if (!RepoTags) {
                    return null
                }
                return RepoTags.map((t: any) => {
                    let color = 'blue'
                    if (t.indexOf('none') !== -1) {
                        color = 'red'
                    } else if (t.indexOf('latest') !== -1) {
                        color = 'green'
                    }
                    return <Tag key={t} color={color}>{t}</Tag>
                })
            },
            width: 700,
        },
        {
            title: '镜像大小',
            dataIndex: 'Size',
            render: size => <span>{bytesToSize(size)}</span>,
            width: 120,
        },
        {
            title: '虚拟镜像大小',
            dataIndex: 'VirtualSize',
            render: VirtualSize => <span>{bytesToSize(VirtualSize)}</span>,
            width: 120,
        },
        {
            title: '共享镜像大小',
            dataIndex: 'SharedSize',
            render: SharedSize => <span>{bytesToSize(SharedSize)}</span>,
            width: 120,
        },
        {
            title: '创建时间',
            dataIndex: 'Created',
            width: 180,
            render: time => <span>{dateToStr(time * 1000)}</span>,
        },
        {
            title: '操作',
            dataIndex: 'address',
            fixed: 'right',
            width: 180,
            render: (_, image: DockerImage) => {
                return (
                    <Space>
                        <Button size="small" type="link">运行</Button>
                        <Button size="small" type="link" onClick={() => showDetailDrawer(image.Id)}>详情</Button>
                        <Button size="small" type="link">更多</Button>
                    </Space>
                )
            }

        },
    ];


    useEffect(() => {
        getDockerImages().then(data => {
            setImages(data)
        })
    }, [])


    return (
        <div id="imagePage" className={"box"}>
            <Table
                columns={columns} dataSource={images}
                scroll={{x: 1000}}
                rowKey={record => record.Id}/>
            <Drawer title="镜像详情"
                    destroyOnClose={true}
                    width={720}
                    onClose={() => setDrawerStatus(false)}
                    visible={drawerStatus}>
                <ImageDetailDrawer imageId={currentImageId}/>
            </Drawer>
        </div>
    )
}

export default ImagePage;