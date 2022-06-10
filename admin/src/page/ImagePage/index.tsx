import {Button, Checkbox, Divider, Drawer, message, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {getDockerImages} from "../../api/Image/ImageApi";
import {ColumnsType} from "antd/es/table";
import DockerImage from "../../api/Model/DockerImage";
import bytesToSize from "../../utils/ByteSize";
import dateToStr from "../../utils/Time";
import ImageDetailDrawer from "../../component/App/Image/ImageDetailDrawer";
import {useNavigate} from "react-router-dom";
import Search from "antd/es/input/Search";
import {
    CloudSyncOutlined,
    ReloadOutlined
} from "@ant-design/icons";


function ImagePage() {

    let [images, setImages] = useState<Array<DockerImage>>([])
    let [currentImageId, setCurrentImageId] = useState<string>("")
    let [drawerStatus, setDrawerStatus] = useState<boolean>(false)
    let navigate = useNavigate()

    function showDetailDrawer(imageId: string) {
        setCurrentImageId(imageId)
        setDrawerStatus(true)
    }

    function runImage(Id: string) {
        navigate(`/app/image/${Id}/run`)
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
                    return <span key={t}>{t}</span>
                })
            },
            width: 300,
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
                        <Button onClick={() => runImage(image.Id)} size={"small"}>运行</Button>
                        <Button onClick={() => showDetailDrawer(image.Id)} size={"small"}>详情</Button>
                        <Button onClick={() => showDetailDrawer(image.Id)} size={"small"}>更多</Button>
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

    function refresh() {
        message.warning('正在刷新镜像列表');
    }

    return (
        <div id="imagePage" className={"box"}>
            <div>
                <div className="imageController inline">
                    <Search placeholder="输入关键字以搜索镜像" style={{width: 400}}/>
                    <Button onClick={refresh} className="ml-2" icon={<ReloadOutlined/>}>刷新</Button>
                    <Button className="ml-2" icon={<CloudSyncOutlined/>}>优化</Button>
                </div>
            </div>
            <Table
                size={"small"}
                columns={columns}
                dataSource={images}
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