import { Form, Input, Button, DatePicker, Space } from "antd"
import { SearchOutlined, BuildOutlined,PullRequestOutlined } from '@ant-design/icons'
export default function ImageSerchForm() {
    const [form] = Form.useForm();
    return (
        <Form layout={'inline'}
            form={form}
            initialValues={{}}
            style={{ maxWidth: 'none' }}>

            <Form.Item label="名称">
                <Input placeholder="请输入镜像名称" />
            </Form.Item>
            <Form.Item label="构建时间">
                <DatePicker placeholder="请选择构建时间" />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button icon={<SearchOutlined />}>搜索</Button>
                    <Button icon={<BuildOutlined />}>构建</Button>
                    <Button icon={<PullRequestOutlined />}>拉取</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

/*
1. 改造点： 接力送搜索校区的时候携带参数 : withDistrict(boolean)
2. 
*/