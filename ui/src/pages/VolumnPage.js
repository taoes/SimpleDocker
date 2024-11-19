import { Form, Input, DatePicker, Button, Table, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

export default function VolumnPage() {
    const [form] = Form.useForm();

    const columns = [
        {
            title: '存储卷ID',
            dataIndex: 'containerId',
            key: 'containerId'
        },
        {
            title: '存储卷名称',
            dataIndex: 'containerName',
            key: 'containerId',
        },
        {
            title: '网络大小',
            dataIndex: 'containerSize',
            key: 'containerId',
        },
        {
            title: '网络数量',
            dataIndex: 'containerCount',
            key: 'containerId',
        },
    ]

    const dataSource = []

    return (
        <div id="containerPage">
            <Form layout={'inline'}
                form={form}
                name='1'
                initialValues={{}}
                style={{ maxWidth: 'none' }}>

                <Form.Item label="名称">
                    <Input placeholder="请输入网络名称" />
                </Form.Item>
                <Form.Item label="构建时间">
                    <DatePicker placeholder="请选择构建时间" />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button icon={<SearchOutlined />}>搜索</Button>
                    </Space>
                </Form.Item>
            </Form>
            <Table columns={columns} dataSource={dataSource} bordered size='small'></Table>



        </div>
    )


}