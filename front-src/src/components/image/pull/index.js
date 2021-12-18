import React from 'react'
import './index.css'
import {Button, Input, message, Progress, Select, Space} from "antd";
import {Option} from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import {CloseOutlined, LoadingOutlined, SendOutlined} from "@ant-design/icons";

import domain from "../../../config/config"

class ImagePullModal extends React.Component {

    constructor(props) {
        super(props);
        this.ws = null
        this.state = {
            imageTag: '',
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

    startPullImage() {
        let {imageTag} = this.state;

        if (this.state.pullBtnDisable) {
            message.warning("镜像拉取中,请等待完成后尝试操作！")
            return
        }
        message.loading({content: '镜像开始拉取中,请稍等....', key: imageTag});

        // 创建WS链接
        this.ws = new WebSocket(`${domain.ws}/ws/image/pull?tag=${imageTag}`)
        let that = this
        let msg = message

        // WS 链接开启
        this.ws.onopen = function () {
            that.setState({pullBtnDisable: true, pullInfo: []})
        }

        // 接收到消息
        this.ws.onmessage = function (e) {
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
                msg.loading({content: "镜像开始更新......", key: imageTag})
                that.setState({pullBtnDisable: true, pullLog})
                return;
            }


            if (status.startsWith('Status: Image is up to date for')) {
                msg.info({content: "镜像更新成功......", key: imageTag, duration: 4})
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
        this.ws.onclose = function (e) {
            msg.warning({content: 'WebSocket服务已关闭', key: imageTag, duration: 5})
            that.setState({pullBtnDisable: false})
        }

        // WS 链接出现错误
        this.ws.onerror = function (e) {
            msg.error({content: '链接服务器失败，请检查后重试!', key: imageTag, duration: 5})
            that.setState({pullBtnDisable: false})
        }
    }


    render() {
        let layerInfo = Object.values(this.state.pullInfo);
        //层拉取信息
        let layerPullInfo = layerInfo.map(info => {
            return (
                <div className="pullImageProgress">
                    <span style={{width: 50}} key={`${info.title}-layer`}>{info.title.substring(0, 5)}</span>
                    <Progress key={info.title} percent={info.progress}/>
                </div>
            );
        });
        return (
            <div id="imagePullArea">
                {/*拉取镜像的控制区域*/}
                <div id="imagePullCtr">
                    <Space>
                        <span>授权</span>
                        <Select defaultValue="无" style={{width: 100}}>
                            <Option value="Sign Up">Sign Up</Option>
                            <Option value="Sign In">Sign In</Option>
                        </Select>

                        <span>标签</span>
                        <Input style={{width: 400}}
                               value={this.state.imageTag}
                               onChange={(e) => this.setState({imageTag: e.target.value})}
                               placeholder="请输入拉取镜像标签" allowClear/>

                        <Button
                            onClick={() => this.startPullImage()}
                            type="primary" icon={this.getStartBtnIcon()}>拉取</Button>
                    </Space>
                </div>
                {/*拉取镜像的进度*/}
                <div id="imagePullProgress">{layerPullInfo}</div>
                {/*拉取镜像的日志*/}
                <div id="pullImageLogs" className="imagePullLogs">
                    <TextArea value={this.state.pullLog} rows={5}/>
                </div>
            </div>
        );
    }


}

export default ImagePullModal;
