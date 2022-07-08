import {
  Button,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
  Tag
} from "antd";
import React from "react";
import {getDockerImages, reTagImage,removeImage} from "../../api/Image/ImageApi";
import {ColumnsType} from "antd/es/table";
import DockerImage from "../../api/Model/DockerImage";
import bytesToSize from "../../utils/ByteSize";
import dateToStr from "../../utils/Time";

import _ from 'lodash'
import Search from "antd/lib/input/Search";
import ImageDetailDrawer from "../../component/App/Image/ImageDetailDrawer";

import {
  CloudSyncOutlined, ReloadOutlined, ExclamationCircleOutlined

} from '@ant-design/icons'
import WithRouter from "../../router/WithRouter";
import {RouterProps} from "react-router";

interface ImagePageProps {
  router: RouterProps
}

interface ImagePageState {
  images: Array<DockerImage>,
  searchKey: string,
  currentImageId: string,
  detailDrawerStatus: boolean,
  moreDrawerStatus: boolean,
  renameModalStatus: boolean,
}


class ImagePage extends React.Component<ImagePageProps, ImagePageState> {
  private renameData: { newTag: string; imageId: string };

  /**
   * 镜像表格的数据
   * @private
   */
  private readonly columns: ColumnsType<DockerImage>;

  constructor(props: ImagePageProps) {
    super(props);
    this.renameData = {imageId: '', newTag: ''}
    this.state = {
      images: [],
      searchKey: '',
      currentImageId: '',
      detailDrawerStatus: false,
      moreDrawerStatus: false,
      renameModalStatus: false,
    }
    this.columns = [
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
                <Button onClick={() => this.runImage(image.Id)} size={"small"}>运行</Button>
                <Button onClick={() => this.showDetailDrawer(image.Id)} size={"small"}>详情</Button>
                <Button onClick={() => this.showMoreDrawer(image.Id)} size={"small"}>更多</Button>
              </Space>
          )
        }

      },
    ];
  }


  componentDidMount() {
    // 当组件挂载的时候加载镜像列表
    this.loadImages(this.state.searchKey)
  }

  /**
   * 显示镜像详情
   */
  showDetailDrawer(imageId: string) {
    this.setState({currentImageId: imageId, detailDrawerStatus: true})
  }

  /**
   * 显示更多侧边栏
   */
  showMoreDrawer = (imageId: string) => {
    this.setState({currentImageId: imageId, moreDrawerStatus: true})
  }

  runImage = (imageId: string) => {
    //@ts-ignore
    this.props.router.navigate(`/app/image/${imageId}/run`)
  }


  /* 刷新镜像列表 */
  loadImages = (searchKey: string) => {
    getDockerImages(searchKey).then(resp => {
      if (resp.code !== 0) {
        message.error(`镜像列表加载失败:${resp.msg}`).then();
        return
      }
      this.setState({images: resp.data})
    })
  }


  updateValue(value: string) {
    _.debounce(function () {
      console.log(value)
    }, 1000)
  }


  /**
   * 显示重命名的Modal 并且 关闭更多侧边栏
   */
  showRenameModal = () => {
    this.setState({
      renameModalStatus: true,
      moreDrawerStatus: false
    })
  }

  deleteImage = () => {
    this.setState({moreDrawerStatus: false})
    let imageId = this.state.currentImageId
    let refreshImage = this.loadImages
    Modal.confirm({
      title: `您确认删除该镜像吗？`,
      icon: <ExclamationCircleOutlined/>,
      content: '此操作不可逆，请谨慎操作!!!',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        removeImage(imageId,false).then(resp=>{
          if (resp.code !== 0) {
            message.error(`镜像删除失败:${resp.msg}`).then();
            return
          }else{
            message.error(`镜像删除成功`).then();
            refreshImage("")
          }
        })
      }
    });

  }

  /**
   * 重命名镜像
   */
  renameImageTag = async () => {
    let that = this;
    let resp = await reTagImage(this.renameData.imageId, this.renameData.newTag);
    if (resp.code != 0) {
      message.error(`操作失败,异常信息:${resp.msg}`).then();
      return
    }
    that.setState({
      renameModalStatus: false
    })
    message.info(`操作成功,正在更新镜像列表`).then();
    this.loadImages(this.state.searchKey)
  }


  updateReTagData = (data: any, allData: any) => {
    this.renameData = allData
  }

  render() {
    return (
        <div id="imagePage" className={"box"}>
          <div>
            <div className="imageController inline">
              <Search placeholder="输入关键字以搜索镜像" style={{width: 400}}
                      onChange={e => this.setState({searchKey: e.target.value})}/>
              <Button onClick={() => this.loadImages(this.state.searchKey)} className="ml-2"
                      icon={<ReloadOutlined/>}>刷新</Button>
              <Button className="ml-2" icon={<CloudSyncOutlined/>} danger>清理</Button>
            </div>
          </div>

          <Table
              size={"small"}
              columns={this.columns}
              dataSource={this.state.images}
              scroll={{x: 1000}}
              rowSelection={{fixed: 'left', type: 'checkbox'}}
              rowKey={record => record.Id}/>
          <Drawer title="镜像详情"
                  destroyOnClose={true}
                  width={"50%"}
                  onClose={() => this.setState({detailDrawerStatus: false})}
                  visible={this.state.detailDrawerStatus}>
            <ImageDetailDrawer imageId={this.state.currentImageId}/>
          </Drawer>

          <Drawer title="更多操作"
                  destroyOnClose={true}
                  width={350}
                  onClose={() => this.setState({moreDrawerStatus: false})}
                  visible={this.state.moreDrawerStatus}>
            <div className={"flex"}>
              <Button className={"m-1"} danger onClick={() => this.deleteImage()}>删除镜像</Button>
              <Button className={"m-1"} onClick={() => this.showRenameModal()}>重新标记</Button>
              <Button className={"m-1"}>备份镜像</Button>
            </div>
          </Drawer>

          <Modal title="重命名镜像" visible={this.state.renameModalStatus}
                 okText={"重命名"}
                 cancelText={"取消"}
                 onOk={() => this.renameImageTag()}
                 onCancel={() => this.setState({renameModalStatus: false})}>
            <Form
                name="basic"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                initialValues={{imageId: this.state.currentImageId, newTag: ''}}
                autoComplete="off"
                onValuesChange={this.updateReTagData}
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
}

export default WithRouter(ImagePage);