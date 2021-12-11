import React from 'react'
import './index.css'
import {Button, Input, message, Progress, Select, Space} from "antd";
import {Option} from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import {LoadingOutlined, SendOutlined} from "@ant-design/icons";

import domain from "../../../config/config"

class ImagePullModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pullBtnDisable: false,
            pullLog: '',
            pullInfo: []
        }
    }

    getStartBtnIcon() {
        if (this.state.pullBtnDisable) {
            return <LoadingOutlined/>

        } else {
            return <SendOutlined/>
        }
    }

    startPullImage(imageTag, auth) {
        if (this.state.pullBtnDisable) {
            message.warning("镜像拉取中,请等待完成后尝试操作！")
            return
        }

        message.info("镜像开始拉取中,请稍等")


        // 创建WS链接
        let ws = new WebSocket(`${domain.ws}/api/ws/image/pull`)
        let that = this
        let msg = message

        // WS 链接开启
        ws.onopen = function () {
            that.setState({pullBtnDisable: true, pullInfo: []})
        }

        // 接收到消息
        ws.onmessage = function (e) {
            console.log(e.data)

            let infoList = that.state.pullInfo
            let pullLog = that.state.pullLog
            let infoMap = new Map()
            infoList.forEach(i => infoMap.set(i.title, i))

            let data = e.data;

            that.setState({pullLog: pullLog + "\n" + data})
            let {status, id, progressDetail} = JSON.parse(data)
            // 开始拉取
            if (status.startsWith('Pulling from')) {
                msg.info("镜像开始更新......")
                that.setState({pullBtnDisable: true, pullLog})
                return;
            }


            if (status.startsWith('Status: Image is up to date for')) {
                msg.info("镜像更新成功.....")
                that.setState({pullBtnDisable: false, pullLog})
                return;
            }

            switch (status) {
                // 拉取某一层
                case 'Pulling fs layer':
                    that.setState({pullInfo: [...infoList, {title: id, progress: 0}]})
                    break
                // 等待中
                case 'Waiting':
                    break;
                // 下载中
                case 'Downloading':
                    let info = infoMap.get(id)
                    if (!info) {
                        that.setState({pullInfo: [...infoList, {title: id, progress: 0}]})
                        return
                    }
                    let {current, total} = progressDetail
                    let p = (current * 100 / total).toFixed(2)
                    info.progress = p > 98 ? 100 : p
                    that.setState({pullInfo: infoList})
                    break
                // 校验中
                case 'Extracting':
                case 'Pull complete':
                case 'Verifying Checksum':
                case 'Already exists':
                    let infos = infoMap.get(id)
                    if (!infos) {
                        that.setState({pullInfo: [...infoList, {title: id, progress: 100}]})
                        return
                    }
                    infos.progress = 100
                    that.setState({pullBtnDisable: false, pullInfo: infoList})
                    break
                default:
            }

        }

        // WS 链接被关闭
        ws.onclose = function (e) {


        }

        // WS 链接出现错误
        ws.onerror = function (e) {

        }
    }


    render() {

        return (
            <div>
                <div id="imagePullCtr">
                    <Space>
                        <span>授权</span>
                        <Select defaultValue="无" style={{width: 100}}>
                            <Option value="Sign Up">Sign Up</Option>
                            <Option value="Sign In">Sign In</Option>
                        </Select>

                        <span>标签</span>
                        <Input style={{width: 400}} placeholder="请输入拉取镜像标签" allowClear/>

                        <Button
                            onClick={() => this.startPullImage()}
                            type="primary" icon={this.getStartBtnIcon()}>拉取</Button>
                    </Space>
                </div>
                <div id="imagePullProgress">
                    {
                        Object.values(this.state.pullInfo).map(info => {
                            return (
                                <div className="pullImageProgress">
                                    <span style={{width: 50}}>{info.title.substring(0, 5)}</span>
                                    <Progress
                                        key={info.title}
                                        percent={info.progress}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div id="pullImageLogs" className="imagePullLogs">
                    <TextArea value={this.state.pullLog}/>
                </div>
            </div>
        );
    }
}

export default ImagePullModal;
