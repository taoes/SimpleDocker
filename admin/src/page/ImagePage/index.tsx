import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Space, Switch,
  Table,
  Tag
} from "antd";
import {useEffect, useState} from "react";
import {getDockerImages, reTagImage} from "../../api/Image/ImageApi";
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
  let [renameModalState, setRenameModalState] = useState<boolean>(false)
  let navigate = useNavigate()
  let renameData = {imageId: '', newTag: ''}

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
      }
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
              <Button onClick={() => runImage(image.Id)} size={"small"} type={"primary"}>运行</Button>
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

  /* 刷新镜像列表 */
  let refresh = () => {
    getDockerImages().then(resp => {
      if (resp.code !== 0) {
        message.error(`镜像列表加载失败:${resp.msg}`).then();
        return
      }
      setImages(resp.data)
    })
  }

  /**
   * 显示重命名的Modal 并且 关闭更多侧边栏
   */
  let showRenameModal = () => {
    setRenameModalState(true);
    setMoreDrawerStatus(false);
  }

  /**
   * 重命名镜像
   */
  let renameImageTag = () => {
    reTagImage(renameData.imageId, renameData.newTag).then(data => {
      if (data.code != 0) {
        message.error(`操作失败,异常信息:${data.msg}`).then();
        return
      }
      setRenameModalState(false)
      message.info(`操作成功,正在更新镜像列表`).then();
      refresh()
    })

  }

  let updateReTagData = (data: any, allData: any) => {
    renameData = allData
  }


  /* 删除镜像 */
  let deleteImage = () => {

  }
  return (
      <div id="imagePage" className={"box"}>
        <div>
          <div className="imageController inline">
            <Search placeholder="输入关键字以搜索镜像" style={{width: 400}}/>
            <Button onClick={()=>refresh()} className="ml-2" icon={<ReloadOutlined/>}
                    type={"primary"}>刷新</Button>
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
            <Button className={"m-1"} danger onClick={() => deleteImage()}>删除镜像</Button>
            <Button className={"m-1"} type="default"
                    onClick={() => showRenameModal()}>重新标记</Button>
            <Button className={"m-1"} type="default">备份镜像</Button>
          </div>
        </Drawer>

        <Modal title="重命名镜像" visible={renameModalState}
               okText={"重命名"}
               cancelText={"取消"}
               onOk={() => renameImageTag()}
               onCancel={() => setRenameModalState(false)}>
          <Form
              name="basic"
              labelCol={{span: 4}}
              wrapperCol={{span: 20}}
              initialValues={{imageId: currentImageId, newTag: ''}}
              autoComplete="off"
              onValuesChange={updateReTagData}
          >
            <Form.Item
                label="镜像ID"
                name="imageId"
                rules={[{required: true, message: 'imageId'}]}>
              <Input readOnly/>
            </Form.Item>

            <Form.Item
                label="新标签"
                name="newTag"
                rules={[{required: true, message: '请输入新的标签名'}]}>
              <Input allowClear/>
            </Form.Item>
          </Form>


        </Modal>
      </div>
  )
}
