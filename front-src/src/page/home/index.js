import {Component} from "react";
import {JsonEditor as Editor} from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import './index.css'
import {Button, Descriptions, Modal, Tag} from "antd";
import {getDockerInfo} from '../../api/InfoApi'
import bytesToSize from "../../utils/ByteSize";

let _ = require('lodash')

/**
 * 主页布局文件
 */
class ImagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: {},
            version: {},
            disk: {},
            modalVisible: false
        }
    }

    componentDidMount() {
        getDockerInfo().then(resp => {
            let {info, version, disk} = resp.data
            this.setState({info, version, disk})
        })
    }

    setModalVisible(val) {
        this.setState({modalVisible: val})
    }

    showDetail(data) {
        this.setState({modalVisible: true, detailData: data})
    }

    render() {


        return (
            <div>
                <Descriptions
                    bordered
                    size="small"
                    title="Docker 版本信息"
                    extra={<Button type="primary" onClick={() => this.showDetail(this.state.info)}>详情信息</Button>}>
                    <Descriptions.Item label="服务端版本">{this.state.info.ServerVersion}</Descriptions.Item>
                    <Descriptions.Item
                        label="接口版本">{_.get(this.state.version, "ApiVersion")}</Descriptions.Item>
                    <Descriptions.Item label="Arch">{_.get(this.state.version, "Arch")}</Descriptions.Item>
                    <Descriptions.Item
                        label="Go版本">{_.get(this.state.version, "GoVersion")}</Descriptions.Item>
                    <Descriptions.Item
                        label="内核版本">{_.get(this.state.version, "KernelVersion")}</Descriptions.Item>
                    <Descriptions.Item label="构建时间">{_.get(this.state.version, "BuildTime")}</Descriptions.Item>

                </Descriptions>

                <div style={{height: 10}}/>
                <Descriptions
                    bordered
                    size="small"
                    title="Docker 使用信息">
                    <Descriptions.Item label="Socket">{_.get(this.state.info, "DockerRootDir")}</Descriptions.Item>
                    <Descriptions.Item label="镜像数">{_.get(this.state.info, "Images")}</Descriptions.Item>
                    <Descriptions.Item label="容器数">{_.get(this.state.info, "Containers")}</Descriptions.Item>
                    <Descriptions.Item label="系统时间">{_.get(this.state.info, "SystemTime")}</Descriptions.Item>
                    <Descriptions.Item label="操作版本">{_.get(this.state.info, "OperatingSystem")}</Descriptions.Item>
                    <Descriptions.Item label="容器架构">{_.get(this.state.info, "Architecture")}</Descriptions.Item>
                    <Descriptions.Item label="容器数目">
                        总容器数: <Tag key="Containers" color="blue">{_.get(this.state.info, "Containers")}</Tag>

                        运行容器数: <Tag key="Containers" color="green">{_.get(this.state.info, "ContainersRunning")}</Tag>

                        暂停器数: <Tag key="Containers" color="gold">{_.get(this.state.info, "ContainersPaused")}</Tag>

                        停止器数: <Tag key="Containers" color="red">{_.get(this.state.info, "ContainersStopped")}</Tag>

                    </Descriptions.Item>
                </Descriptions>



                <Modal
                    title="详情信息"
                    centered
                    visible={this.state.modalVisible} i
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                    width={810}>
                    <Editor
                        value={this.state.detailData}
                    />
                </Modal>
            </div>

        )
    }

}

export default ImagePage;