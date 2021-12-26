import React from 'react'
import {Form, Radio, Input, Button, Select, Checkbox, Space, message} from "antd";


const {Option} = Select


// 监控页面
class MonitorPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tempShow: {},
            tempContent: {},
            status: 'pause',
            url: 'https://docker.zhoutao123.com'
        }

    }

    // 测试告警
    testAlter = () => {
        message.info("告警测试完成")
    }


// 监控内容变动
    monitorChange = (value) => {
        let tempShow = {
            showDiskAlterTemp: value.indexOf('disk') !== -1,
            showLiveAlterTemp: value.indexOf('live') !== -1,
            showCpuAlterTemp: value.indexOf('cpu') !== -1,
            showMemAlterTemp: value.indexOf('mem') !== -1,
        }
        this.setState({tempShow});
    }


    render() {
        return (
            <Form>
                <Form.Item label="搜集状态" name="layout">
                    <Select defaultValue={this.state.status} onChange={val => this.setState({status: val})}>
                        <Option value="open">开启</Option>
                        <Option value="close">关闭</Option>
                        <Option value="pause">暂停</Option>
                        <Option value="stop">停止</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="采样频率" name="rate" tooltip="建议设置为每小时30次">
                    <Input suffix="次/小时"/>
                </Form.Item>

                <Form.Item label="webHook" tooltip="POST方式">
                    <Input defaultValue={this.state.url}/>
                </Form.Item>

                <Form.Item label="采样内容">
                    <Checkbox.Group onChange={this.monitorChange}>
                        <Checkbox value="mem">容器内存</Checkbox>
                        <Checkbox value="cpu">容器CPU</Checkbox>
                        <Checkbox value="live">容器存活</Checkbox>
                        <Checkbox value="disk">容器磁盘</Checkbox>
                    </Checkbox.Group>
                    <Button type="link" onClick={this.testAlter}>示例</Button>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary">保存</Button>
                        <Button type="primary" onClick={this.testAlter}>测试</Button>
                    </Space>
                </Form.Item>
            </Form>
        );
    }
}


export default MonitorPage;
