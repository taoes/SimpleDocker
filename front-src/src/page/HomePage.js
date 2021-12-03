import {Component} from "react";
import {Button, Descriptions} from "antd";

/**
 * 主页布局文件
 */
class ImagePage extends Component {

    render() {
        return (
            <div>
                <Descriptions
                    bordered
                    title="Docker 概述信息"
                    extra={<Button type="primary">详情信息</Button>}>
                    <Descriptions.Item label="Docker版本">Cloud Database</Descriptions.Item>
                    <Descriptions.Item label="宿主机系统">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="time">18:00:00</Descriptions.Item>
                    <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                    <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                    <Descriptions.Item label="Config Info">
                        Data disk type: MongoDB
                        <br/>
                        Database version: 3.4
                        <br/>
                        Package: dds.mongo.mid
                        <br/>
                        Storage space: 10 GB
                        <br/>
                        Replication factor: 3
                        <br/>
                        Region: East China 1<br/>
                    </Descriptions.Item>
                </Descriptions>

                <div style={{height:10}}> </div>
                <Descriptions
                    bordered
                    title="Docker 容器信息"
                    extra={<Button type="primary">详情信息</Button>}>
                    <Descriptions.Item label="Docker版本">Cloud Database</Descriptions.Item>
                    <Descriptions.Item label="宿主机系统">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="time">18:00:00</Descriptions.Item>
                    <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                    <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                    <Descriptions.Item label="Config Info">
                        Data disk type: MongoDB
                        <br/>
                        Database version: 3.4
                        <br/>
                        Package: dds.mongo.mid
                        <br/>
                        Storage space: 10 GB
                        <br/>
                        Replication factor: 3
                        <br/>
                        Region: East China 1<br/>
                    </Descriptions.Item>
                </Descriptions>
            </div>

        )
    }

}

export default ImagePage;