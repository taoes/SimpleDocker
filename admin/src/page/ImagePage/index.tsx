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


export default function ImagePage() {

  let [images, setImages] = useState<Array<DockerImage>>([])
  let [currentImageId, setCurrentImageId] = useState<string>("")
  let [detailDrawerStatus, setDetailDrawerStatus] = useState<boolean>(false)
  let [moreDrawerStatus, setMoreDrawerStatus] = useState<boolean>(false)
  let navigate = useNavigate()

  /**
   * 显示镜像详情
   * @param imageId
   */
  function showDetailDrawer(imageId: string) {
    setCurrentImageId(imageId)
    setDetailDrawerStatus(true)
  }

  let showMoreDrawer = (imageId: string) => {
    setCurrentImageId(imageId)
    setMoreDrawerStatus(true)
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
              <Button onClick={() => showMoreDrawer(image.Id)} size={"small"}>更多</Button>
            </Space>
        )
      }

    },
  ];


  useEffect(() => {
    refresh()
  }, [])

  function refresh() {
    message.info('正在加载镜像列表').then();
    getDockerImages().then(data => {
      setImages(data)
    })
  }

  return (
      <div id="imagePage" className={"box"}>
        <div>
          <div className="imageController inline">
            <Search placeholder="输入关键字以搜索镜像" style={{width: 400}}/>
            <Button onClick={refresh} className="ml-2" icon={<ReloadOutlined/>} type={"primary"}>刷新</Button>
            <Button className="ml-2" icon={<CloudSyncOutlined/>} danger type={"primary"}>优化</Button>
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
                width={"50%"}
                onClose={() => setDetailDrawerStatus(false)}
                visible={detailDrawerStatus}>
          <ImageDetailDrawer imageId={currentImageId}/>
        </Drawer>

        <Drawer title="更多操作"
                destroyOnClose={true}
                width={350}
                onClose={() => setMoreDrawerStatus(false)}
                visible={moreDrawerStatus}>
          <div className={"flex"}>
            <Button className={"m-1"} danger>删除镜像</Button>
            <Button className={"m-1"} type="default">重新标记</Button>
            <Button className={"m-1"} type="default">备份镜像</Button>
          </div>
        </Drawer>
      </div>
  )
}
