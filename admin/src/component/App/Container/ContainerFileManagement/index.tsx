import {Button, Input, List, message, PageHeader} from "antd";
import {FolderAddOutlined, UploadOutlined} from '@ant-design/icons'
import React from "react";
import WithRouter from "../../../../router/WithRouter";
import './index.css'
import IconFont from "../../../Base/IconFont";

interface Props {
}

interface State {
    fsList: Array<ContainerFileDesc>
    content: string
    currentPath: string
}


// drwxr-xr-x   2 root  root  4.0K Apr 18 00:00 lib64
interface ContainerFileDesc {
    // 文件属性 0
    attrFlag: string,
    // 文件硬链接数 1 
    fileHardLinkCount: number,
    // 文件/目录 所有者 2 
    owner?: string | null,
    //  文件/目录 所在组 3
    group?: string,
    // 文件大小 4 
    size?: string,
    // 修改时间 5,6,7
    modify?: string,
    // 文件名 8
    name?: string
}

class ContainerFileManagement extends React.Component<Props, State> {

    ws: WebSocket | null = null

    constructor(prop: Props) {
        super(prop);

        this.state = {
            currentPath: "/",
            content: '',
            fsList: []
        }
    }

    componentDidMount() {
        this.initSocket()
    }

    componentWillUnmount() {
        this.ws?.close()
        message.info("文件管理服务连接已关闭");
    }

    initSocket = () => {
        this.ws = new WebSocket('ws://localhost:3364//api/ws/client/DEFAULT/container/7307128bfd3221e0386efa49d2654029abc271f7ae5a62df64255054d9b61903/fs')
        this.ws.onopen = () => {
            message.info("WS服务连接成功....");
            this.ws?.send(`ls ${this.state.currentPath} -lah`)
        }

        this.ws.onmessage = (data: MessageEvent): any => {
            // 解析WebSocket的返回数据
            let content = this.state.content + data.data
            // 解析WebSocket数据
            this.parseContentList(content);
            return 0;
        }
    }

    // 接收到WebSocket数据之后尝试解析数据
    parseContentList = (content: string) => {
        let fsList: Array<ContainerFileDesc> = []
        let splitResult: string[] = content.split("\r\n")
        splitResult.forEach(row => {
            if (!row) {
                return
            }
            this.setState({content})
            let fields = row.split(" ")
            if (fields.length <= 8) {
                return
            }

            let fs: ContainerFileDesc = {attrFlag: '', fileHardLinkCount: 0}
            let feIndex = 0;
            fields.forEach((fe) => {
                if (!fe || fe.trim().length === 0) {
                    return
                }
                switch (feIndex) {
                    case 0:
                        fs.attrFlag = fe;
                        break;
                    case 1:
                        fs.fileHardLinkCount = 0;
                        break;
                    case 2:
                        fs.group = fe;
                        break;
                    case 3:
                        fs.owner = fe;
                        break;
                    case 4:
                        fs.size = fe;
                        break;
                    case 5:
                    case 6:
                    case 7:
                        fs.modify = fe;
                        break;
                    case 8:
                        fs.name = fe;
                        break;
                }
                feIndex++;
            })
            fsList.push(fs)
        })
        this.setState({fsList})
        console.log(this.state.fsList)
    }

    // 点击按钮之后刷新结果
    resetContentList = () => {
        this.setState({fsList: [], content: ''})
    }

    // 打开新的文件夹
    openDir = (name: any) => {
        if (!name) {
            return
        }
        name = name.trim()
        let currentPath = this.state.currentPath + name + "/"
        if (name === "/") {
            currentPath = "/"
        } else if (name === ".") {
            // 刷新列表
        } else if (name === "..") {
            // ToDo 返回上一层
        }
        this.resetContentList()
        this.ws?.send(`ls ${currentPath} -lah`)
        this.setState({currentPath})
    }

    fsToItem = (fs: ContainerFileDesc) => {
        let {attrFlag, name} = fs
        if (attrFlag.startsWith('d')) {
            return (
                <List.Item actions={[<Button type="link" onClick={() => this.openDir(name)}>访问</Button>]}>
                    <List.Item.Meta
                        avatar={<IconFont type="icon-icon_wenjianjia_kai" style={{fontSize: 30}}/>}
                        title={name}
                    />
                </List.Item>
            )
        }


        if (attrFlag.startsWith('-')) {

            if (!!name && name.trim().endsWith('png')) {
                return (
                    <List.Item actions={[<a>下载</a>, <a>删除</a>]}>
                        <List.Item.Meta
                            avatar={<IconFont type="icon-icon_wenjian_tupian" style={{fontSize: 30}}/>}
                            title={name}
                        />
                    </List.Item>)
            }

            return (
                <List.Item actions={[<a>下载</a>, <a>删除</a>]}>
                    <List.Item.Meta
                        avatar={<IconFont type="icon-icon_wenjian_qita" style={{fontSize: 30}}/>}
                        title={name}
                    />
                </List.Item>)
        }


        return (
            <List.Item actions={[<a>下载</a>, <a>删除</a>]}>
                <List.Item.Meta
                    avatar={<IconFont type="icon-icon_wenjian_qita" style={{fontSize: 30}}/>}
                    title={name}
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
                        onBack={() => this.openDir("..")}
                        extra={[
                            <Button id="uploadFile" icon={<UploadOutlined/>}>上传</Button>,
                            <Button id="newCategory" icon={<FolderAddOutlined/>}>新目录</Button>,
                            <Button id="newCategory" icon={<FolderAddOutlined/>}
                                    onClick={() => this.openDir("/")}>根目录</Button>,
                            <Input placeholder="请输入文件名" style={{width: 200}}/>
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
                        locale={{emptyText: "暂无文件"}}
                        size="small"
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={this.state.fsList}
                        renderItem={this.fsToItem}/>
                </div>
            </div>
        )
    }
}

export default WithRouter(ContainerFileManagement);