import {Button, Form, Input, InputNumber, Select} from "antd";
import {useState} from "react";

interface TerminalConfig {
    fontFamily: String
    fontSize: Number
    theme: String
    shell: String
}


export default function TerminalConfigTab() {


    const initData: any = {
        fontFamily: 'SFangsong,Monaco',
        fontSize: 16,
        theme: 'default',
        shell: '/bin/zsh'
    }

    let [initTerminalConfig] = useState(initData)

    let submitTerminalConfig = (values: TerminalConfig) => {
        console.log(JSON.stringify(values))
    }


    return (
        <Form
            className="box"
            name="basic"
            labelCol={{span: 1}}
            wrapperCol={{span: 15}}
            initialValues={initTerminalConfig}
            onFinish={submitTerminalConfig}
            autoComplete="off">
            <Form.Item
                label="字体"
                name="fontFamily"
                colon={false}
                rules={[{required: true, message: '请输入字体'}]}>
                <Input placeholder="请输入终端默认字体"/>
            </Form.Item>

            <Form.Item
                label="字号"
                name="fontSize"
                colon={false}
                rules={[{required: true, message: '请输入字号'}]}>
                <InputNumber style={{width: '100%'}} placeholder="请输入终端默认字体"/>
            </Form.Item>

            <Form.Item
                label="主题"
                name="theme"
                colon={false}
                rules={[{required: true, message: '请选择主题'}]}>
                <Select defaultValue="default">
                    <Select.Option value="default">默认</Select.Option>
                    <Select.Option value="default1">主题1</Select.Option>
                    <Select.Option value="default2">主题2</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Shell"
                name="shell"
                colon={false}
                rules={[{required: false}]}>
                <Input placeholder="请输入Shell路径,默认值为/bin/sh"/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
            </Form.Item>
        </Form>
    )
}
