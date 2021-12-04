import {Component} from "react";
import {Button, Descriptions} from "antd";
import {getDockerInfo} from '../api/InfoApi'
import bytesToSize from "../utils/ByteSize";

let _ = require('lodash')

/**
 * 主页布局文件
 */
class ImagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {info: {}, version: {}, disk: {}}
    }

    componentDidMount() {
        getDockerInfo().then(resp => {
            let {info, version, disk} = resp.data
            this.setState({info, version, disk})
        })
    }

    render() {
        return (
            <div>
                <Descriptions
                    bordered={true}
                    size="small"
                    title="Docker 版本信息"
                    extra={<Button type="primary">详情信息</Button>}>
                    <Descriptions.Item label="服务端版本">{this.state.info.ServerVersion}</Descriptions.Item>
                    <Descriptions.Item label="客户端版本">{this.state.version.client}</Descriptions.Item>
                    <Descriptions.Item
                        label="ApiVersion">{_.get(this.state.version, "server.ApiVersion")}</Descriptions.Item>
                    <Descriptions.Item label="Arch">{_.get(this.state.version, "server.Arch")}</Descriptions.Item>
                    <Descriptions.Item
                        label="GoVersion">{_.get(this.state.version, "server.GoVersion")}</Descriptions.Item>
                    <Descriptions.Item
                        label="KernelVersion">{_.get(this.state.version, "server.KernelVersion")}</Descriptions.Item>
                    <Descriptions.Item label="构建时间">{_.get(this.state.version, "server.BuildTime")}</Descriptions.Item>

                </Descriptions>

                <div style={{height: 10}}/>
                <Descriptions
                    bordered
                    title="Docker 使用信息"
                    extra={<Button type="primary">详情信息</Button>}>
                    <Descriptions.Item label="Socket">{_.get(this.state.info, "DockerRootDir")}</Descriptions.Item>
                    <Descriptions.Item label="镜像数">{_.get(this.state.info, "Images")}</Descriptions.Item>
                    <Descriptions.Item label="容器数">{_.get(this.state.info, "Containers")}</Descriptions.Item>
                    <Descriptions.Item label="系统时间">{_.get(this.state.info, "SystemTime")}</Descriptions.Item>
                    <Descriptions.Item label="操作版本">{_.get(this.state.info, "OperatingSystem")}</Descriptions.Item>
                    <Descriptions.Item label="容器架构">{_.get(this.state.info, "Architecture")}</Descriptions.Item>
                    <Descriptions.Item label="容器数目">
                        总容器数: {_.get(this.state.info, "Containers")}
                        <br/>
                        运行容器数: {_.get(this.state.info, "ContainersRunning")}
                        <br/>
                        暂停器数: {_.get(this.state.info, "ContainersPaused")}
                        <br/>
                        停止器数: {_.get(this.state.info, "ContainersStopped")}
                        <br/>
                    </Descriptions.Item>
                </Descriptions>


                <div style={{height: 10}}/>
                <Descriptions
                    bordered
                    title="Docker 磁盘使用"
                    extra={<Button type="primary">详情信息</Button>}>
                    <Descriptions.Item label="总层大小">{bytesToSize(_.get(this.state.disk, "LayersSize",0))}</Descriptions.Item>
                    <Descriptions.Item label="构建大小">{bytesToSize(_.get(this.state.disk, "BuilderSize",0))}</Descriptions.Item>
                </Descriptions>
            </div>

        )
    }

}

export default ImagePage;