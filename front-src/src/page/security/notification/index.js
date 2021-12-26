import React from 'react'
import {Button, Checkbox, Form, Input, message, Select, Space} from "antd";

class NotificationPage extends React.Component {
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
                <Form.Item label="通知状态" name="layout">
                    <Select defaultValue={this.state.status} onChange={val => this.setState({status: val})}>
                        <Select.Option value="open">开启</Select.Option>
                        <Select.Option value="close">关闭</Select.Option>
                        <Select.Option value="pause">暂停</Select.Option>
                        <Select.Option value="pause">停止</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="通知渠道" name="style">
                    <Select mode="multiple" defaultValue={this.state.status} onChange={val => this.setState({status: val})}>
                        <Select.Option value="open">企业微信</Select.Option>
                        <Select.Option value="close">钉钉</Select.Option>
                        <Select.Option value="pause">飞书</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="webHook" tooltip="POST方式">
                    <Input defaultValue={this.state.url}/>
                </Form.Item>
                <Form.Item label="监控内容">
                    <Checkbox.Group onChange={this.monitorChange}>
                        <Checkbox value="mem">容器内存</Checkbox>
                        <Checkbox value="cpu">容器CPU</Checkbox>
                        <Checkbox value="live">容器存活</Checkbox>
                        <Checkbox value="disk">容器磁盘</Checkbox>
                    </Checkbox.Group>
                    <Button type="link" onClick={this.testAlter}>模板示例</Button>
                </Form.Item>
                {
                    this.state.tempShow.showMemAlterTemp ?
                        <Form.Item label="内存告警">
                            <Input.TextArea/>
                        </Form.Item> : null
                }

                {
                    this.state.tempShow.showCpuAlterTemp ?
                        <Form.Item label="CPU告警">
                            <Input.TextArea/>
                        </Form.Item> : null
                }

                {
                    this.state.tempShow.showLiveAlterTemp ?
                        <Form.Item label="存活告警">
                            <Input.TextArea/>
                        </Form.Item> : null
                }


                {
                    this.state.tempShow.showDiskAlterTemp ?
                        < Form.Item label="磁盘告警">
                            <Input.TextArea/>
                        </Form.Item> : null
                }


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

export default NotificationPage;
