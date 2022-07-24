import { Button, Descriptions, Input, List, PageHeader, Space } from "antd";
import { UploadOutlined, FolderAddOutlined, RollbackOutlined } from '@ant-design/icons'
import React from "react";
import WithRouter from "../../../../router/WithRouter";
import './index.css'
import IconFont from "../../../Base/IconFont";

interface Props { }

interface State {
    fsList: Array<File>
}

interface File {
    name: string
    type?: string
}

class ContainerFileManagement extends React.Component<Props, State>{

    constructor(prop: Props) {
        super(prop);
        this.state = {
            fsList: [{ name: "文件1", type: 'category' }, { name: "文件2", type: 'file' }, { name: "文件3", type: 'picture' }, { name: "文件4" }]
        }
    }

    componentDidMount() {
        this.initSocket()

    }

    initSocket = () => { }


    fsToItem = (fs: File) => {
        let { type, name } = fs
        if (type === 'category') {
            return (
                <List.Item actions={[<a>删除</a>]}>
                    <List.Item.Meta
                        avatar={<IconFont type="icon-icon_wenjianjia_kai" style={{ fontSize: 30 }} />}
                        title={name}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )
        }


        if (type === 'file') {
            return (
                <List.Item actions={[<a>下载</a>, <a>删除</a>]}>
                    <List.Item.Meta
                        avatar={<IconFont type="icon-icon_wenjian_qita" style={{ fontSize: 30 }} />}
                        title={name}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>)
        }

        if (type === 'picture') {
            return (
                <List.Item actions={[<a>下载</a>, <a>删除</a>]}>
                    <List.Item.Meta
                        avatar={<IconFont type="icon-icon_wenjian_tupian" style={{ fontSize: 30 }} />}
                        title={name}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>)
        }


        return (
            <List.Item actions={[<a>下载</a>, <a>删除</a>]}>
                <List.Item.Meta
                    avatar={<IconFont type="icon-icon_wenjian_qita" style={{ fontSize: 30 }} />}
                    title={name}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
        )
    }

    render() {




        return (
            <div id="containerFile">
                <div id="fsContainer">

                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        extra={[
                            <Button id="uploadFile" icon={<UploadOutlined />}>上传</Button>,
                            <Button id="newCategory" icon={<FolderAddOutlined />}>新目录</Button>,
                            <Input placeholder="请输入文件名" style={{ width: 200 }} />
                        ]}
                    >
                        {/* <Descriptions size="small" column={5} bordered={true}>
                            <Descriptions.Item label="总数量">Lili Qu</Descriptions.Item>
                            <Descriptions.Item label="文件夹数量">12</Descriptions.Item>
                            <Descriptions.Item label="可执行文件">20</Descriptions.Item>
                            <Descriptions.Item label="链接文件">1</Descriptions.Item>
                            <Descriptions.Item label="图片文件">1</Descriptions.Item>
                            <Descriptions.Item label="其他文件">0</Descriptions.Item>
                        </Descriptions> */}
                    </PageHeader>
                </div>

                <div id="fmContent">
                    <List
                        bordered split
                        locale={{ emptyText: "暂无文件" }}
                        size="small"
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={this.state.fsList}
                        renderItem={this.fsToItem} />
                </div>
            </div>
        )
    }
}

export default WithRouter(ContainerFileManagement);